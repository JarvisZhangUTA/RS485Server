const config = require('../config');
const UserModel = require('./User');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');

module.exports = class {
  constructor() {
    this.connection = mysql.createConnection({
      host: config.db_host,
      user: config.db_user,
      password : config.db_pass,
      database : config.db_maintance_db
    });
    this.connection.connect();
  }

  getParts() {
    return new Promise((res, rej) => {
      const query = `SELECT * FROM parts`;

      this.connection.query(query, function (error, results, fields) {
        if(error) {
          rej(error.code + ' ' + error.sqlMessage);
          return;
        }

        if( results.length == 0 ) {
          rej('Parts not found');
          return;
        }

        res( JSON.parse( JSON.stringify(results) ) );
      });
    });
  }

  getReplacements(params) {
    return new Promise((res, rej) => {
      let query = `SELECT * FROM replacement`;

      let page = 1;
      let per_page = 20;

      if( params && Object.keys(params).length > 0 ) {
        query += ` WHERE 1 `;
        Object.keys(params).forEach(key => {
          if( key === 'page' ) { page = params.page; return; }
          if( key === 'per_page' ) { per_page = params.per_page; return; }
          query += ` AND ` + key + ` = '` + params[key] + `' `;
        });
      }

      let count_query = query.replace('*', 'count(*) as total');
      this.connection.query(count_query, (error, results, fields) => {
        if(error) {
          rej(error.code + ' ' + error.sqlMessage);
          return;
        }

        let total = results[0].total;
        if( total == 0 ) {
          res({total: 0, data: []});
          return;
        }

        query += ` LIMIT ` + per_page + ` OFFSET ` + ( ( page - 1 ) * per_page );

        this.connection.query(query, (error, results, fields) => {
          if(error) {
            rej(error.code + ' ' + error.sqlMessage);
            return;
          }

          let replacements = JSON.parse( JSON.stringify(results) );
        
          let replacement_ids = [];
          let user_ids = [];

          replacements.forEach(replacement => {
            replacement_ids.push(replacement.id);
            user_ids.push(replacement.user_id);
          });

          replacement_ids = replacement_ids.join(',');

          let parts_query = `SELECT * from replacement_parts where replacement_id in (` + replacement_ids + `)`;

          this.connection.query(parts_query, (error, results, fields) => {
            if(error) {
              rej(error.code + ' ' + error.sqlMessage);
              return;
            }

            let parts = JSON.parse( JSON.stringify(results) );
            replacements.forEach(replacement => {
              let cur_parts = parts.filter(item => item.replacement_id = replacement.id);
              replacement.parts = cur_parts;
            });

            const userModel = new UserModel();
            userModel.getUsers({id: user_ids}).then(users => {
                replacements.forEach(replacement => {
                  let cur_user = users.find(item => item.id = replacement.user_id);
                  replacement.user = cur_user;
                });
                res({total: total, data: replacements});
            }, err => {
                rej(err);
            });

          });
        });
      });
    });
  }

  getReplacement(id) {
    return new Promise((res, rej) => {
      const query = `SELECT * FROM replacement where id = ` + id;

      this.connection.query(query, (error, results, fields) => {
        if(error) {
          rej(error.code + ' ' + error.sqlMessage);
          return;
        }

        if( results.length == 0 ) {
          rej('Form not found');
          return;
        }

        let replacement = JSON.parse( JSON.stringify(results[0]) );
        let parts_query = `SELECT * from replacement_parts where replacement_id = ` + id;
        
        this.connection.query(parts_query, function (error, results, fields) {
          if(error) {
            rej(error.code + ' ' + error.sqlMessage);
            return;
          }
          replacement.parts = results;

          const userModel = new UserModel();
          userModel.getUser(replacement.user_id).then(user => {
            replacement.user = user;
            res(replacement);
          }, err => {
              rej(err);
          });
        });
      });
    });
  }

  createReplacements(replacement) {
    return new Promise((res, rej) => {
      let keys = ``;
      let values = ``;
      let parts = [];

      Object.keys(replacement).forEach(key => {
        if( key == 'id' ) { return; }
        if( key == 'parts' ) { parts = replacement[key]; return; }
        if( replacement[key] === null || replacement[key] === '' ) { return; }
        keys += key + `,`;
        values += `'` + replacement[key] + `',`;
      });

      keys = keys.substr(0, keys.length - 1);
      values = values.substr(0, values.length - 1);

      let query = `INSERT INTO replacement (` + keys + `) VALUES (` + values + `)`;
      this.connection.query(query, (error, results, fields) => {
        if(error) {
          rej(error.code + ' ' + error.sqlMessage);
          return;
        }
        
        let new_replacement_id = results.insertId;

        if( parts.length > 0 ) {
          let parts_query = ``;

          parts.forEach(item => {
            let parts_keys = `replacement_id,`;
            let parts_values = `'` + new_replacement_id + `',`;

            Object.keys(item).forEach(key => {
              if( key == 'id' ) { return; }
              if( item[key] === null || item.key === '' ) { return; }
              parts_keys += key + `,`;
              parts_values += `'` + item[key] + `',`;
            });

            parts_keys = parts_keys.substr(0, parts_keys.length - 1);
            parts_values = parts_values.substr(0, parts_values.length - 1);

            if(parts_query.length === 0) {
              parts_query += `INSERT INTO replacement_parts (` + parts_keys + `) VALUES (` + parts_values + `) `;
            } else {
              parts_query += `,(` + parts_values + `) `;
            }
          });
    
          this.connection.query(parts_query, function (error, results, fields){
            if(error) {
              rej(error.code + ' ' + error.sqlMessage);
              return;
            }

            res(new_replacement_id);
          });
        } else {
          res(new_replacement_id);
        }
      });
    });
  }
}
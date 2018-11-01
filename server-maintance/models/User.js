const config = require('../config');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');

module.exports = class {
  constructor() {
    this.connection = mysql.createConnection({
      host: config.db_host,
      user: config.db_user,
      password : config.db_pass,
      database : config.db_user_db
    });
    this.connection.connect();
  }

  login(user = {}) {
    return new Promise((res, rej) => {
      if( !user.password || !user.email ) {
        rej('Email / Password needed!')
      }

      const query = `
        SELECT id, email, level_id
        FROM users
        WHERE email = '` + user.email + `' and password = '` + user.password + `';
      `;

      this.connection.query(query, (error, results, fields) => {
        if(error) {
          console.log(error);
          rej(error.code + ' ' + error.sqlMessage);
          return;
        }

        if( results.length == 0 ) {
          rej('User not found');
          return;
        }

        const userData = JSON.parse( JSON.stringify(results[0]) );

        this.getLevel(userData.level_id).then( data => {
          userData.level = data;
          userData.token = jwt.sign(userData, config.jwt_secret);
          res(userData);
        }, err => {
          rej(err);
        });
      });
    });
  }

  getLevel(id) {
    return new Promise((res, rej) => {
      const query = `SELECT * FROM levels where id = ` + id;

      this.connection.query(query, function (error, results, fields) {
        if(error) {
          rej(error.code + ' ' + error.sqlMessage);
          return;
        }

        if( results.length == 0 ) {
          rej('Level not found');
          return;
        }

        res( JSON.parse( JSON.stringify(results[0]) ) );
      });
    });
  }

  getLevels() {
    return new Promise((res, rej) => {
      const query = `SELECT * FROM levels`;

      this.connection.query(query, function (error, results, fields) {
        if(error) {
          rej(error.code + ' ' + error.sqlMessage);
          return;
        }

        if( results.length == 0 ) {
          rej('Levels not found');
          return;
        }

        res( JSON.parse( JSON.stringify(results) ) );
      });
    });
  }

  getUser(id) {
    return new Promise((res, rej) => {
      const query = `SELECT id, email, level_id FROM users where id = ` + id;

      this.connection.query(query, function (error, results, fields) {
        if(error) {
          rej(error.code + ' ' + error.sqlMessage);
          return;
        }

        if( results.length == 0 ) {
          rej('User not found');
          return;
        }

        res( JSON.parse( JSON.stringify(results[0]) ) );
      });
    });
  }

  getUsers(params = {}) {
    return new Promise((res, rej) => {
      let query = `SELECT id, email, level_id FROM users`;

      if( params.id ) {
        if( !Array.isArray(params.id) ) { params.id = [params.id]; }
        
        let ids = params.id.join(',');

        query += ` WHERE id in (` + ids + `)`;
      }

      this.connection.query(query, function (error, results, fields) {
        if(error) {
          rej(error.code + ' ' + error.sqlMessage);
          return;
        }

        if( results.length == 0 ) {
          rej('Users not found');
          return;
        }

        res( JSON.parse( JSON.stringify(results) ) );
      });
    });
  }

  createUser(user) {
    return new Promise((res, rej) => {
      let keys = ``;
      let values = ``;
      Object.keys(user).forEach(key => {
        if( key == 'id' ) { return; }
        keys += key + `,`;
        values += `'` + user[key] + `',`;
      });

      keys = keys.substr(0, keys.length - 1);
      values = values.substr(0, values.length - 1);

      let query = `INSERT INTO users (` + keys + `) VALUES (` + values + `)`;

      this.connection.query(query, function (error, results, fields) {
        if(error) {
          rej(error.code + ' ' + error.sqlMessage);
          return;
        }

        res(results.insertId);
      });
    });
  }

  updateUser(user) {
    return new Promise((res, rej) => {
      let query = `UPDATE users SET  `;
      Object.keys(user).forEach(key => {
        if( key == 'id' ) {
          return;
        }
        query += key + ` = '` + user[key] + `', `;
      });
      query = query.substr(0, query.length - 2);
      query += ` WHERE id = ` + user.id;

      this.connection.query(query, function (error, results, fields) {
        if(error) {
          rej(error.code + ' ' + error.sqlMessage);
          return;
        }

        res();
      });
    });
  }

  deleteUser(user_id) {
    return new Promise((res, rej) => {
      let query = `DELETE FROM users WHERE id = ` + user_id;

      this.connection.query(query, function (error, results, fields) {
        if(error) {
          rej(error.code + ' ' + error.sqlMessage);
          return;
        }

        res(results);
      });
    });
  }
}
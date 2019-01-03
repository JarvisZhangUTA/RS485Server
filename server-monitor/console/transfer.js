const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/monitor');

const CommandManager = require('../class/Manager/CommandManager');
const commandManager = new CommandManager();

const mysql = require('mysql');

const CommandModel = require('../models/Command.model');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password : 'qgk112358',
  database : 'monitor'
});
connection.connect();

connection.query('SELECT * FROM temp', (error, results, fields) => {
  let all_commands = [];

  results.forEach(result => {
    let commands = commandManager.splitCommand(result.number);

    commands.forEach(command => {
      command.device_id = '';
      command.date = result.date;
      all_commands.push( command );
    });
  });

  CommandModel.collection.insert(all_commands, function (err, docs) {
    if (err){ 
        return console.error(err);
    } else {
      console.log("Multiple documents inserted to Collection");
    }
  });
});
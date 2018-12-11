const CommandManager = require('./class/Manager/CommandManager');
const commandManager = new CommandManager();

const mysql = require('mysql');

const CommandModel = require('./models/Command.model');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password : 'qgk112358',
  database : 'monitor'
});
connection.connect();

connection.query('SELECT * FROM temp', (error, results, fields) => {
  results.forEach(result => {
    console.log(result.id);
    let commands = commandManager.splitCommand(result.number);
    commands.forEach(command => {
      command.device_id = 'UNKNOW';
      command.date = result.date;
      new CommandModel(command).save();
    });
  });
});
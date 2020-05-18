const Sequelize = require("sequelize");

const connection = new Sequelize('tasks', 'root', 'password', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

module.exports = connection;


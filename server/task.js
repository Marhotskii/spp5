const Sequelize = require('sequelize');
const db  = require('./db_connection');


const Task = db.define('task', {
    name: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.STRING
    }
});

Task.sync();

module.exports = Task;
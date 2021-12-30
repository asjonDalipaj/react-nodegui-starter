const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('test-db', 'usr', 'pwd', {
    dialect: 'sqlite',
    host: './db/dev.sqlite',
})

module.exports = sequelize;
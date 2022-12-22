const { Sequelize } = require('sequelize');

module.exports = new Sequelize('sandbox', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  dialectOptions: {
    decimalNumbers: true,
  },
  logging: console.log,
});
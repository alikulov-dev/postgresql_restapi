// const mysql = require("mysql");
const Sequelize = require('sequelize');
require('dotenv').config()
//Sequelize connection

var connection = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.HOST,
    port: 5438,
    dialect: 'postgres',
    logging: true
});
connection
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });
module.exports = connection;
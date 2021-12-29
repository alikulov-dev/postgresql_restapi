const sequelize = require("./db.js");
const Sequelize = require('sequelize');
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Author = require("./author.js")(sequelize, Sequelize);
module.exports = db;
const path = require("path");
const Sequelize = require("sequelize");

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Space = require("./space")(sequelize, Sequelize);
db.User = require("./user")(sequelize, Sequelize);

db.User.belongsTo(db.Space);

module.exports = db;

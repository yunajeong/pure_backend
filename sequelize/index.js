const { Sequelize } = require("sequelize");
const userDefiner = require("../models/User");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
  }
);
userDefiner(sequelize);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((err) => {
    console.error("Database synchronization failed:", err);
  });

module.exports = sequelize;

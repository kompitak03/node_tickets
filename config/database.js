const Sequelize = require("sequelize");

module.exports = new Sequelize("test", "root", "", {
  host: "localhost",
  dialect: "mysql",
  timezone: "+07:00", // -->Add this line. for writing to database
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

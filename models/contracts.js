const Sequelize = require("sequelize");
const db = require("../config/database");

module.exports = db.define(
  "contracts",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    contractno: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.STRING
    },
    subtype: {
      type: Sequelize.STRING
    },
    circuitid: {
      type: Sequelize.STRING
    },
    circuitname: {
      type: Sequelize.STRING
    },
    provider: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    start: {
      type: Sequelize.DATEONLY
    },
    end: {
      type: Sequelize.DATEONLY
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    userCreated: {
      type: Sequelize.STRING
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    userUpdated: {
      type: Sequelize.STRING
    },
    active: {
      type: Sequelize.NUMBER
    }
  },
  {
    timestamps: false
  }
);

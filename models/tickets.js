const Sequelize = require("sequelize");
const moment = require("moment");
const db = require("../config/database");

const tickets = db.define("tickets", {
  status: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  problemDate: {
    type: Sequelize.DATEONLY,
    get: function() {
      return moment(this.getDataValue("problemDate"))
        .utcOffset("+07:00")
        .format("YYYY-MM-DD");
    }
  },
  problemTime: {
    type: Sequelize.TIME
  },
  fixedDate: {
    type: Sequelize.DATEONLY,
    get: function() {
      return moment(this.getDataValue("fiexdDate"))
        .utcOffset("+07:00")
        .format("YYYY-MM-DD");
    }
  },
  fixedTime: {
    type: Sequelize.TIME
  },
  ticketid: {
    type: Sequelize.STRING
  },
  cause: {
    type: Sequelize.STRING
  },
  contractNo: {
    type: Sequelize.STRING
  },
  effect: {
    type: Sequelize.STRING
  },
  problem: {
    type: Sequelize.STRING
  },
  provider: {
    type: Sequelize.STRING
  },
  repairing: {
    type: Sequelize.STRING
  },
  totalProblemTime: {
    type: Sequelize.NUMBER
  },
  circuitId: {
    type: Sequelize.STRING
  },
  remark: {
    type: Sequelize.STRING
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
  }
});

module.exports = tickets;

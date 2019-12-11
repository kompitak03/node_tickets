const express = require("express");
const router = express.Router();
const db = require("../config/database");
const tickets = require("../models/tickets");
const moment = require("moment");
const Sequelize = require("sequelize");
const validateToken = require("../config/utils").validateToken;
const Op = Sequelize.Op;
// Get tickets on process
router.get("/list/:type", validateToken, (req, res) => {
  let status = "all";
  let type = req.params.type;
  if (type === "onprocess") {
    status = "On process";
  } else if (type === "complate") {
    status = "Complate";
  } else if (type === "delete") {
    status = "Delete";
  }
  let where = {
    where: {
      status: {
        [Op.ne]: "Delete"
      }
    }
  };
  if (status !== "all") {
    where = {
      where: {
        status: status
      }
    };
  }

  tickets
    .findAll(where)
    .then(output => {
      res.json({
        success: true,
        data: output
      });
    })
    .catch(err => {
      res.json({
        success: false,
        msg: err
      });
    });
});

// Add ticket
router.post("/add", validateToken, (req, res) => {
  let countData = "";

  tickets
    .findAll({
      where: {
        problemDate: req.body.problemDate
      }
    })
    .then(ticketsOp => {
      let count = ticketsOp.length + 1;
      if (ticketsOp.length < 9) {
        countData = "000" + count;
      } else if (ticketsOp.length < 99) {
        countData = "00" + count;
      } else if (ticketsOp.length < 999) {
        countData = "0" + count;
      } else if (ticketsOp.length < 9999) {
        countData = count;
      }
      let date =
        moment()
          .utcOffset("+07:00")
          .format("YYYYMM")
          .toString() + countData.toString();

      let data = {
        ticketid: date,
        status: "On process",
        problemDate: req.body.problemDate,
        problemTime: req.body.problemTime,
        fixedDate: req.body.fixedDate,
        fixedTime: req.body.fixedTime,
        cause: req.body.cause,
        contractNo: req.body.contractno,
        effect: req.body.effect,
        problem: req.body.problem,
        provider: req.body.provider,
        repairing: req.body.repairing,
        totalProblemTime: 0,
        circuitId: req.body.circuitId,
        description: req.body.remark,
        userCreated: req.body.user,
        userUpdated: req.body.user
      };

      let problemDateTime = moment(req.body.problemDateTime);
      let fiexdDateTime = moment(req.body.fiexdDateTime);
      let diff = fiexdDateTime.diff(problemDateTime, "minutes");

      data.totalProblemTime = diff;
      // Insert into table
      tickets
        .create(data)
        .then(output => {
          res.json({
            success: true,
            msg: "Create ticket success."
          });
        })
        .catch(err => {
          res.json({
            success: false,
            msg: err
          });
        });
    });
});

// Delete ticket
router.put("/delete/:id", validateToken, (req, res) => {
  tickets
    .findAll({ where: { ticketid: req.params.id } })
    .then(output => {
      if (output.length) {
        tickets
          .update(
            { status: "Delete", userUpdate: req.body.user },
            { where: { ticketid: req.params.id } }
          )
          .then(() => {
            res.json({
              success: true,
              msg: "Delete successful"
            });
          })
          .catch(err => {
            res.json({
              success: false,
              msg: err
            });
          });
      } else {
        res.json({
          success: false,
          msg: "ticketid not found"
        });
      }
    })
    .catch(err => {
      res.json({
        success: false,
        err: err
      });
    });
});

// Update ticket
router.put("/update/:id", validateToken, (req, res) => {
  tickets
    .findAll({ where: { ticketid: req.params.id } })
    .then(output => {
      let data = {
        status: req.body.status,
        problemDate: req.body.problemDate,
        problemTime: req.body.problemTime,
        fixedDate: req.body.fixedDate,
        fixedTime: req.body.fixedTime,
        cause: req.body.cause,
        contractNo: req.body.contractNo,
        effect: req.body.effect,
        problem: req.body.problem,
        provider: req.body.provider,
        repairing: req.body.repairing,
        totalProblemTime: 0,
        circuitId: req.body.circuitId,
        description: req.body.remark,
        userUpdated: req.body.user
      };

      let problemDateTime = moment(
        new Date(req.body.problemDate + " " + req.body.problemTime)
      );
      let fiexdDateTime = moment(
        new Date(req.body.fixedDate + " " + req.body.fixedTime)
      );
      let diff = fiexdDateTime.diff(problemDateTime, "minutes");

      data.totalProblemTime = diff;

      if (output.length) {
        tickets
          .update(data, { where: { ticketid: req.params.id } })
          .then(() => {
            res.json({
              success: true,
              msg: "Update successful"
            });
          })
          .catch(err => {
            res.json({
              success: false,
              msg: err
            });
          });
      } else {
        res.json({
          success: false,
          msg: "ticketid not found"
        });
      }
    })
    .catch(err => {
      res.json({
        success: false,
        err: err
      });
    });
});

module.exports = router;

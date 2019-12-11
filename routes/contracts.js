const express = require("express");
const router = express.Router();
const db = require("../config/database");
const contracts = require("../models/contracts");
const moment = require("moment");
const Sequelize = require("sequelize");
const Contracts = require("./../models/contracts");
const validateToken = require("../config/utils").validateToken;
const Op = Sequelize.Op;

// Get Contracts
router.get("/list/:type", validateToken, (req, res) => {
  let type = req.params.type;
  console.log(type);
  let where = {
    where: {
      active: {
        [Op.ne]: 0
      }
    }
  };
  if (type === "unactive") {
    where = {
      where: {
        active: {
          [Op.ne]: 1
        }
      }
    };
  }
  contracts
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

// Add Contract
router.post("/add", validateToken, (req, res) => {
  let data = {
    contractno: req.body.contractno,
    provider: req.body.provider,
    description: req.body.description,
    circuitid: req.body.circuitid,
    circuitname: req.body.circuitname,
    type: req.body.type,
    subtype: req.body.subtype,
    start: req.body.start,
    end: req.body.end,
    userCreated: req.body.user,
    userUpdated: req.body.user
  };

  // Insert into table
  Contracts.create(data)
    .then(output => {
      if (output) {
        res.json({
          success: true,
          msg: "Contract create successful"
        });
      } else {
        res.json({
          success: false,
          msg: "Contract fail to create"
        });
      }
    })
    .catch(err => {
      res.json({
        success: false,
        msg: err
      });
    });
});

// Delete ticket
router.put("/delete/:id", validateToken, (req, res) => {
  Contracts.findOne({ where: { id: req.params.id } })
    .then(output => {
      if (output) {
        Contracts.update(
          { active: 0, userUpdate: req.body.user, updatedAt: new Date() },
          { where: { id: req.params.id } }
        )
          .then(output => {
            if (output) {
              res.json({
                success: true,
                msg: "Delete successful"
              });
            } else {
              res.json({
                success: false,
                msg: "Delete fail"
              });
            }
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
          msg: "circuitid not found"
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
  Contracts.findOne({ where: { id: req.params.id } })
    .then(output => {
      let data = {
        contractno: req.body.contractno,
        provider: req.body.provider,
        description: req.body.description,
        circuitid: req.body.circuitid,
        circuitname: req.body.circuitname,
        type: req.body.type,
        subtype: req.body.subtype,
        start: req.body.start,
        end: req.body.end,
        userUpdated: req.body.user,
        updatedAt: new Date()
      };

      if (output) {
        Contracts.update(data, { where: { id: req.params.id } })
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
          msg: "circuitid not found"
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

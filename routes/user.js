const express = require("express");
const user = express.Router();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { SECRET_KEY } = require("../config/config");
const User = require("../models/user");
const validateToken = require("../config/utils").validateToken;
user.use(cors());
// Register
user.post("/register", (req, res) => {
  const today = new Date();
  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    created: today
  };

  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        const hash = bcryptjs.hashSync(userData.password, 10);
        userData.password = hash;
        User.create(userData)
          .then(user => {
            if (user) {
              res.status(200).send({
                success: true,
                msg: "User create successful"
              });
            }
          })
          .catch(err => {
            res.send("error: " + err);
          });
      } else {
        res.json({ error: "User already exits" });
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

// Login
user.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (bcryptjs.compareSync(req.body.password, user.password)) {
        let data = {
          id: user.id,
          name: user.name,
          email: user.email
        };
        let token = jwt.sign(data, process.env.SECRET_KEY, {
          expiresIn: 1800
        });
        res.json({
          success: true,
          token: token,
          userData: data
        });
      } else {
        res.json({
          success: false,
          err:
            "Your password incorrect, please try again or click forgot password"
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

// Profile
user.get("/profile", validateToken, (req, res) => {
  var decoded = req.decoded;
  User.findOne({
    where: {
      id: decoded.id
    }
  })
    .then(user => {
      if (user) {
        res.json({
          success: true,
          data: {
            id: user.id,
            name: user.name,
            email: user.email
          }
        });
      } else {
        res.json({
          success: false,
          msg: "Don't have data for this profile"
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

module.exports = user;

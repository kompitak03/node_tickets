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
user.post("/refresh", validateToken, (req, res) => {
  User.findOne({
    raw: true,
    where: {
      email: req.body.email
    }
  })
    .then(userOp => {
      if (user) {
        let data = {
          id: userOp.id,
          name: userOp.name,
          email: userOp.email
        };
        let token = jwt.sign(data, SECRET_KEY, {
          expiresIn: 1800
        });
        res.json({ token: token });
      } else {
        res.json({ error: "No found user" });
      }
    })
    .catch(err => {
      res.send("error: " + err);
    });
});

module.exports = user;

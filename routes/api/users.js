const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// Load User form models
const User = require("../../models/users.js");

// @route   GET api/users/test
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// @route   POST api/users/register
router.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }).then(username => {
    if (username) {
      return res.status(400).json({ username: "Username have already" });
    } else {
      const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        number: req.body.number
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

module.exports = router;

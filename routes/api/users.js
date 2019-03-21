const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require('passport');

// Export secretOrKey 
const Keys = {
    secretOrKey : 'secret'
};

// Load User form models
const User = require("../../models/users.js");

// GET api/users/test
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

// POST api/users/register
router.post("/register", (req, res) => {
  // Check username Unique
  User.findOne({ username: req.body.username }).then(username => {
    if (username) {
      return res.status(400).json({ username: "Username have already" });
    } else {
      const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        number: req.body.number
      });
      // Encrypt password 10 Rounds
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

// POST api/users/login
router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username }).then(username => {
    // Check username
    if (!username) {
      return res.status(404).json({ username: "User not found" });
    }
    // Check password
    bcrypt.compare(password, username.password).then(isMatch => {
      if (isMatch) {
        // Username isMatched and Create JWT payload
        const payload = {
          id: username.id,
          username: username.username,
          password: username.password
        };

        // Sign Token
        jwt.sign(
          payload,
          Keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer" + token
            });
          }
        );
      } else {
        return res.status(400).json({ password: "Password incorrect" });
      }
    });
  });
});

// POST api/users/current
router.get('/current', passport.authenticate('jwt',{ session : false}), (req,res) => {
  res.json({message : 'Success'});
})

module.exports = router;

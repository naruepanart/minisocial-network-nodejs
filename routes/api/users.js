const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// Load Input Validation
const validateRegisterInput = require('../../validation/register.js');
const validateLoginInput = require('../../validation/login.js');

// Load secretOrKey form config
const keys = require('../../config/keys.js');

// Load User form models
const User = require('../../models/Users.js');

// GET api/users/test
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

// POST api/users/register
router.post('/register', (req, res) => {
  /*  const { errors, isValid } = validateRegisterInput(req.body);
   
   // Check Validation equal false
   if (!isValid) {
     return res.status(400).json(errors);
   }
  */
  // Check username Unique
  User.findOne({ username: req.body.username }).then(user => {
    if (user) {
      errors.username = 'Username already exists';
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        stufirstname: req.body.stufirstname,
        stulastname: req.body.stulastname,
      });
      // Encrypt password 10 Rounds
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser.save(function (err) {
            if (err) {
              console.log(err);
            } else {
              res.status(201).send('Post success');
            }
          })
        });
      });
    }
  });
});

// POST api/users/login
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation equal false
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username }).then(user => {
    // Check username
    if (!user) {
      errors.username = 'User not found';
      return res.status(404).json(errors);
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // Username isMatched and Create JWT payload
        const payload = {
          id: user.id,
          username: user.username,
          password: user.password
        };

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});

// POST api/users/current
// Strategy for authenticating 
router.get('/current', passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      username: req.user.username,
      password: req.user.password
    });
  }
);

module.exports = router;

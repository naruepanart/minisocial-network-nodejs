const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateProfileInput = require('../../validation/profile');

// Load Profile form models
const Profile = require('../../models/Profile');

// Load User form models
const User = require('../../models/Users');

// Load secretOrKey form config
const keys = require('../../config/keys.js');


// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));


// @route   GET api/profile
// @desc    Get current users profile
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const errors = {};

        Profile.findOne({ user: req.user.id })
            // Show detail of user is firstname,lastname
            .populate('user', ['stufirstname', 'stulastname'])
            .then(profile => {
                if (!profile) {
                    errors.noprofile = 'There is no profile for this user';
                    return res.status(404).json(errors);
                }
                res.json(profile);
            })
            .catch(err => res.status(404).json(err));
    }
);

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get('/all', (req, res) => {
    const errors = {};
  
    Profile.find()
      // Show detail of user is firstname,lastname
      .populate('user', ['stufirstname', 'stulastname'])
      .then(profiles => {
        if (!profiles) {
          errors.noprofile = 'There are no profiles';
          return res.status(404).json(errors);
        }
  
        res.json(profiles);
      })
      .catch(err => res.status(404).json({ profile: 'There are no profiles' }));
  });

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get('/handle/:handle', (req, res) => {
    const errors = {};

    Profile.findOne({ handle: req.params.handle })
        // Show detail of user is firstname,lastname
        .populate('user', ['stufirstname', 'stulastname'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }

            res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public

router.get('/user/:user_id', (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.params.user_id })
        // Show detail of user is firstname,lastname
        .populate('user', ['stufirstname', 'stulastname'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user';
                res.status(404).json(errors);
            }

            res.json(profile);
        })
        .catch(err =>
            res.status(404).json({ profile: 'There is no profile for this user' })
        );
});

// @route   POST api/profile
// @desc    Create or Edit users profile
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    const { errors, isValid } = validateProfileInput(req.body);
    // Check Validation
    if (!isValid) {
        // Return errors
        return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};

    // If you do not want to send the user to delete line below
    profileFields.user = req.user.id;

    // Send schema information
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.stunickname) profileFields.stunickname = req.body.stunickname;
    if (req.body.stugender) profileFields.stugender = req.body.stugender;
    if (req.body.stuage) profileFields.stuage = req.body.stuage;
    if (req.body.stutel1) profileFields.stutel1 = req.body.stutel1;
    if (req.body.stutel2) profileFields.stutel2 = req.body.stutel2;
    if (req.body.stuclassroom) profileFields.stuclassroom = req.body.stuclassroom;
    if (req.body.stunumberinclassroom) profileFields.stunumberinclassroom = req.body.stunumberinclassroom;

    // Social networks
    if (req.body.facebook) profileFields.facebook = req.body.facebook;

    /* profileFields.social = {};
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook; */

    // If the user sends the data again, it will update the data
    Profile.findOne({ user: req.user.id }).then(profile => {
        if (profile) {
            // Update
            Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            ).then(profile => res.json(profile));
        } else {
            // Create and Check if handle repeat 
            Profile.findOne({ handle: profileFields.handle }).then(profile => {
                if (profile) {
                    errors.handle = 'That handle already exists';
                    res.status(400).json(errors);
                }

                // Save Profile
                new Profile(profileFields).save().then(profile => res.json(profile));
            });
        }
    });
}
);
module.exports = router;

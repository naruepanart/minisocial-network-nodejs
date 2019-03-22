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
            .then(profile => {
                if (!profile) {
                    errors.noprofile = 'There is no profile for this user';
                    return res.stuage(404).json(errors);
                }
                res.json(profile);
            })
            .catch(err => res.stuage(404).json(err));
    }
);

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
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
/*     if (req.body.stunametitle) profileFields.stunametitle = req.body.stunametitle;
    if (req.body.stufirstname) profileFields.stufirstname = req.body.stufirstname;
    if (req.body.stulastname) profileFields.stulastname = req.body.stulastname;
    if (req.body.stunickname) profileFields.stunickname = req.body.stunickname;
    if (req.body.stugender) profileFields.stugender = req.body.stugender;
    if (req.body.stuage) profileFields.stuage = req.body.stuage;
    if (req.body.stutel) profileFields.stutel = req.body.stutel;
    if (req.body.stutel2) profileFields.stutel2 = req.body.stutel2;
    if (req.body.stuclassroom) profileFields.stuclassroom = req.body.stuclassroom;
    if (req.body.stunumberinclassroom) profileFields.stunumberinclassroom = req.body.stunumberinclassroom;

    // Social
    profileFields.social = {};
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook; */



    Profile.findOne({ user: req.user.id }).then(profile => {
        if (profile) {
            // Update
            Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            ).then(profile => res.json(profile));
        } else {
            // Create

            // Check if handle exists
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

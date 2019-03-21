const Validator = require('validator');

// Load function form is-empty.js
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.username = !isEmpty(data.username) ? data.username : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    /*     data.password2 = !isEmpty(data.password2) ? data.password2 : ''; */

    
    // Check length username not null
    if (Validator.isEmpty(data.username)) {
        errors.username = 'Username field is required';
    }
    // Check length password not null
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    /* // Check length username must be between 6 and 20
    if (!Validator.isLength(data.username, { min: 6, max: 20 })) {
        errors.username = 'Username must be between 6 and 20 characters';
    }
    // Check length password must be between 6 and 20
    if (!Validator.isLength(data.password, { min: 6, max: 20 })) {
        errors.password = 'Password must be between 6 and 20 characters';
    } */

    /*  // Check variable must be the same
     if (Validator.isEmpty(data.password2)) {
         errors.password2 = 'Confirm Password field is required';
     } else {
         if (!Validator.equals(data.password, data.password2)) {
             errors.password2 = 'Passwords must match';
         }
     } */

    return {
        errors,
        // Load function form is-empty.js
        isValid: isEmpty(errors)
    };
}
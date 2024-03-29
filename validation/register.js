const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.stufirstname = !isEmpty(data.stufirstname) ? data.stufirstname : '';
  data.stulastname = !isEmpty(data.stulastname) ? data.stulastname : '';
  /*   data.password2 = !isEmpty(data.password2) ? data.password2 : ''; */

  if (!Validator.isLength(data.username, { min: 2, max: 30 })) {
    errors.username = 'username must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }
  if (Validator.isEmpty(data.stufirstname)) {
    errors.stufirstname = 'Firstname field is required';
  }
  if (Validator.isEmpty(data.stulastname)) {
    errors.stulastname = 'Lastname field is required';
  }

  /*   if (Validator.isEmpty(data.password2)) {
      errors.password2 = 'Confirm Password field is required';
    } else {
      if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = 'Passwords must match';
      }
    } */

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

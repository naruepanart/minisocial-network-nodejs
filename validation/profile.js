const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.stunametitle = !isEmpty(data.stunametitle) ? data.stunametitle : '';
    data.stufirstname = !isEmpty(data.stufirstname) ? data.stufirstname : '';
    data.stulastname = !isEmpty(data.stulastname) ? data.stulastname : '';
    data.stunickname = !isEmpty(data.stunickname) ? data.stunickname : '';
    data.stugender = !isEmpty(data.stugender) ? data.stugender : '';
    data.stuage = !isEmpty(data.stuage) ? data.stuage : '';
    data.stutel1 = !isEmpty(data.stutel1) ? data.stutel1 : '';
    data.stuclassroom = !isEmpty(data.stuclassroom) ? data.stuclassroom : '';
    data.stunumberinclassroom = !isEmpty(data.stunumberinclassroom) ? data.stunumberinclassroom : '';

    if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
        errors.handle = 'Handle needs to between 2 and 40 characters';
    }
    if (Validator.isEmpty(data.handle)) {
        errors.handle = 'Profile handle is required';
    }
    if (Validator.isEmpty(data.stunametitle)) {
        errors.stunametitle = 'Nametitle field is required';
    }
    if (Validator.isEmpty(data.stufirstname)) {
        errors.stufirstname = 'Firstname field is required';
    }
    if (Validator.isEmpty(data.stulastname)) {
        errors.stulastname = 'Lastname field is required';
    }
    if (Validator.isEmpty(data.stunickname)) {
        errors.stunickname = 'Nickname field is required';
    }
    if (Validator.isEmpty(data.stugender)) {
        errors.stugender = 'Gender field is required';
    }
    if (Validator.isEmpty(data.stuage)) {
        errors.stuage = 'stuage field is required';
    }
    if (Validator.isEmpty(data.stutel1)) {
        errors.stutel1 = 'Tel1 field is required';
    }
    if (Validator.isEmpty(data.stuclassroom)) {
        errors.stuclassroom = 'Classroom field is required';
    }
    if (Validator.isEmpty(data.stunumberinclassroom)) {
        errors.stunumberinclassroom = 'Numberinclassroom field is required';
    }
    /* if (!isEmpty(data.facebook)) {
        if (!Validator.isURL(data.facebook)) {
            errors.facebook = 'Facebook not a valid URL';
        }
    } */

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

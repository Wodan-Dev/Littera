'use strict';
/**
 * Module validator
 */

/**
 * Dependencies
 */
const Joi = require('joi');
const validator = require('validator');
const messages = require('./language');

const optionsJoi = {
  abortEarly: false,
  convert: true,
  allowUnknown: false,
  stripUnknown: true,
  noDefaults: false
};

/**
 * Upper Case first character
 * @param  {String} value String
 * @return {String}       String
 */
function capfirst(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * Create a error items
 * @param  {String} field   field name
 * @param  {Any} message result data
 * @return {Object}         object formated for result
 */
function createErrItem(field, message) {
  return {
    field: field,
    message: message
  };
}

/**
 * Create invalid result
 * @param  {Any} value value evaluated
 * @param  {Any} err   Error description
 * @return {Object}       object formated for result
 */
function invalidResult(value, err) {
  return {
    value: value,
    err: err
  };
}

/**
 * Create valid result
 * @param  {Any} value value evaluated
 * @return {Object}       object formated for result
 */
function validResult(value) {
  return {
    value: value
  };
}

/**
 * Validate object with Schema
 * @param  {Object} obj    Object to validate
 * @param  {Object} schema Schema definition
 * @return {Promise}        Resolve/Reject
 */
function validateSchema(obj, schema) {
  return new Promise(function (resolve, reject) {
    Joi.validate(obj, schema, optionsJoi, function (err, value) {
      if (err) {
        let lstErrors = [];
        let regField = new RegExp('((?!\").*(?=\"))');

        for (let i = 0, l = err.details.length; i < l; i++) {
          let field = err.details[i].message.match(regField)[0];
          let msg = capfirst(validator.trim(messages.getLocaleErrorMessage(err.details[i])));

          lstErrors.push(createErrItem(field, msg));
        }
        reject(invalidResult(value, lstErrors));
      }
      else
        resolve(validResult(value));
    });
  });
}

/**
 * Field String
 * @param  {Boolean} required is required
 * @return {Object}          joi instance
 */
function stringField(required) {
  let joi = Joi.string();
  if (required)
    joi = joi.required();
  else
    joi = joi.allow(null, '');

  return joi;
}

/**
 * Field Number
 * @param  {Boolean} required is required
 * @return {Object}          joi instance
 */
function numberField(required) {
  let joi = Joi.number();
  if (required)
    joi = joi.required();

  return joi;
}

/**
 * Field Boolean
 * @param  {Boolean} required is required
 * @return {Object}          joi instance
 */
function booleanField(required) {
  let joi = Joi.boolean();
  if (required)
    joi = joi.required();

  return joi;
}

/**
 * Field Date
 * @param  {Boolean} required is required
 * @return {Object}          joi instance
 */
function dateField(required) {
  let joi = Joi.date();
  if (required)
    joi = joi.required();

  return joi;
}

/**
 * Field nested Object
 * @param  {Boolean} required is required
 * @return {Object}          joi instance
 */
function nestedObject(required, schema) {
  let joi = Joi.object().keys(schema);
  if (required)
    joi = joi.required();

  return joi;
}


/**
 * Field nested Array
 * @param  {Boolean} required is required
 * @return {Object}          joi instance
 */
function nestedArray(required, schema) {
  let joi = Joi.array().items(schema);
  if (required)
    joi = joi.required().min(1);

  return joi;
}

/**
 * Validate ID
 * @param  {Object} id Id which has to be validated
 * @return {Promise}    Resolve/Reject
 */
function validateId(id) {
  return new Promise(function (resolve, reject) {
    if (validator.isMongoId(id)) {
      resolve(validator.trim(id));
    }
    else {
      reject(invalidResult(id, 'Id is invalid.'));
    }
  });
}

const models = {
  stringField: stringField,
  numberField: numberField,
  booleanField: booleanField,
  dateField: dateField,
  nestedArray: nestedArray,
  nestedObject: nestedObject
};

/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  models: models,
  capfirst: capfirst,
  validateSchema: validateSchema,
  validator: validator,
  schema: Joi.object,
  createErrItem: createErrItem,
  invalidResult: invalidResult,
  validResult: validResult,
  validateId: validateId
};

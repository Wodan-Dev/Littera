'use strict';
/**
 * Module authentication
 */


/**
 * Dependencies
 */
const core = require('../../core');
const usersSchema = require('../config/users.schema');
const db = core.connection;
const date = core.date;
const config = core.config;
const crypto = core.crypto;
const validator = core.validator;
const checkField = core.validator.validator;
const usersModel = db.database.model('users', usersSchema.usersSchema);

/**
 * Insert in DB
 * @param  {Object} enterprise Enterprise object
 * @return {Promise}        Resolve/Reject
 */
function insert(user) {
  user.create_at = date.getDateUTC();
  user.modified_at = date.getDateUTC();
  crypto.encrypt(user.password)
    .then(function (hash) {
      user.password = hash;
      return new usersModel(user)
        .save();
    });
}

/**
 * Update in DB
 * @param  {ObjectId} id id which has to be updated
 * @param  {Object} enterprise Enterprise object
 * @return {Promise}        Resolve/Reject
 */
function update(id, user) {
  user.modified_at = date.getDateUTC();

  let query = {
    _id: id
  };

  let opt = {
    upsert: false,
    new: true
  };

  crypto.encrypt(user.password)
    .then(function (hash) {
      user.password = hash;
      return usersModel
        .findOneAndUpdate(query, user, opt)
        .exec();
    });


}

/**
 * Delete in DB
 * @param  {ObjectId} id id which has to be deleted
 * @return {Promise}        Resolve/Reject
 */
function remove(id) {
  return usersModel.findByIdAndRemove(id)
    .exec();
}

/**
 * List all register in DB
 * @return {Promise} Resolve/Reject
 */
function list(page) {
  let pageSize = parseInt(config.getPageSize());
  return usersModel.paginate(
    {
      //  active: true
    },
    {
      page: page,
      limit: pageSize,
      sort: {
        'create_at': 'descending'
      }
    });
}

/**
 * get user by username
 * @param  {ObjectId} username username which has to be loaded
 * @return {Promise}        Resolve/Reject
 */
function findByUserName(username) {
  return usersModel.findOne({ username: username }).exec();
}

/**
 * get user by email
 * @param  {ObjectId} email email which has to be loaded
 * @return {Promise}        Resolve/Reject
 */
function findByUserEmail(email) {
  return usersModel.findOne({ email: email }).exec();
}

/**
 * List the record in the DB that has the specified ObjectId
 * @param  {ObjectId} id id which has to be listed
 * @return {Promise} Resolve/Reject
 */
function findById(id) {
  return usersModel.findById(id)
    .exec();
}

/**
 * Validate create
 * @param  {Object} user user object
 * @return {Promise}      Resolve/Reject
 */
function validateCreate(user) {

  user.username = checkField.trim(checkField.escape(user.username));
  user.email = checkField.trim(checkField.escape(user.email));
  user.password = checkField.trim(checkField.escape(user.password));
  user.passwordbis = checkField.trim(checkField.escape(user.passwordbis));

  return validator.validateSchema(user, usersSchema.usersCreateSchema);
}

/**
 * Validate create
 * @param  {Object} user user object
 * @return {Promise}      Resolve/Reject
 */
function validateUpdate(user) {

  user.password = checkField.trim(checkField.escape(user.password));
  user.passwordbis = checkField.trim(checkField.escape(user.passwordbis));
  user.last_login = checkField.trim(checkField.escape(user.last_login));

  return validator.validateSchema(user, usersSchema.usersUpdateSchema);
}

function validateId(id) {
  return new Promise(function (resolve, reject) {
    if (checkField.isMongoId(id)) {
      resolve(checkField.trim(id));
    }
    else {
      let err = validator.createErrItem('_id', 'Id is invalid.');
      reject(validator.invalidResult(id, err));
    }
  });
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  validateCreate: validateCreate,
  validateUpdate: validateUpdate,
  validateId: validateId,
  insert: insert,
  update: update,
  remove: remove,
  list: list,
  findById: findById,
  findByUserName: findByUserName,
  findByUserEmail: findByUserEmail
};

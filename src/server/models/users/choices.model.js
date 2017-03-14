/**
 * Created by jonathan on 14/03/17.
 */
'use strict';
/**
 * Model users
 */

/**
 * Dependencies
 */
const core = require('../../modules/core');
const usersModel = require('./users.model').model;
const choicesSchema = require('./config/choices.schema');
const db = core.connection;
const date = core.date;
const config = core.config;
const crypto = core.crypto;
const validator = core.validator;
const checkField = core.validator.validator;



/**
 * Insert in DB
 * @param  {Object} review Enterprise object
 * @return {Promise}        Resolve/Reject
 */
function insert(id, choice) {

  let query = {
    _id: db.getObjectId(id)
  };

  let data = {
    $push: {
      choices: {
        content: choice.content,
        create_at: date.getDateUTC(),
        modified_at: date.getDateUTC()
      }
    }
  };

  let opt = {
    upsert: false,
    new: true,
    safe: true
  };

  return usersModel
    .findOneAndUpdate(query, data, opt)
    .exec();
}

/**
 * Update in DB
 * @param  {Object} user review object
 * @return {Promise}        Resolve/Reject
 */
function update(id, choice) {
  let query = {
    _id: id,
    'choices._id': choice._id
  };

  let data = {
    $set: {
      'choices.$.modified_at': date.getDateUTC(),
      'choices.$.content': choice.content
    }
  };

  let opt = {
    upsert: false,
    new: true,
    safe: true
  };

  return usersModel
    .findOneAndUpdate(query, data, opt)
    .exec();
}

/**
 * Delete in DB
 * @param  {Object} review review which has to be deleted
 * @return {Promise}        Resolve/Reject
 */
function remove(choice) {
  let query = {
    _id: choice._id
  };

  let data = {
    $pull: {
      choices: {
        _id: choice._idChoice
      }
    }
  };

  let opt = {
    upsert: false,
    new: true,
    safe: true
  };

  return usersModel
    .findOneAndUpdate(query, data, opt)
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

    },
    {
      page: page,
      limit: pageSize,
      sort: {
        'create_at': 'descending'
      },
      select: {
        'choices': 1
      }
    });
}

/**
 * List all register in DB
 * @return {Promise} Resolve/Reject
 */
function listByUser(user, page) {
  let pageSize = parseInt(config.getPageSize());

  return usersModel.findOne({ username: user })
    .exec();
}

/**
 * List the record in the DB that has the specified ObjectId
 * @param  {ObjectId} id id which has to be listed
 * @return {Promise} Resolve/Reject
 */
function findById(choice) {
  let query = {
    _id: choice._id,
    'choices._id': choice._idChoice
  };

  return usersModel.findOne(query)
    .select('choices')
    .exec();
}

/**
 * Validate create
 * @param  {Object} choice choice object
 * @return {Promise}      Resolve/Reject
 */
function validateCreate(choice) {

  choice.content = checkField.trim(checkField.escape(choice.content));

  return validator.validateSchema(choice, choicesSchema.choicesCreateSchema);
}


/**
 * Validate update
 * @param  {Object} choice choice object
 * @return {Promise}      Resolve/Reject
 */
function validateUpdate(choice) {

  choice._id = checkField.trim(checkField.escape(choice._id));
  choice.content = checkField.trim(checkField.escape(choice.content));

  return validator.validateSchema(choice, choicesSchema.choicesUpdateSchema);
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  validateCreate: validateCreate,
  validateUpdate: validateUpdate,
  insert: insert,
  update: update,
  remove: remove,
  list: list,
  listByUser: listByUser,
  findById: findById
};




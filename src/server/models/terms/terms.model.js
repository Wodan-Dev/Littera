/**
 * Created by Cesar on 04/03/17.
 */
'use strict';
/**
 * Model Terms
 */

/**
 * Dependencies
 */
const core = require('../../modules/core');
const termsSchema = require('./config/terms.schema');
const db = core.connection;
const date = core.date;
const config = core.config;
const validator = core.validator;
const checkField = core.validator.validator;
const termsModel = db.database.model('terms', termsSchema.termsSchema);

/**
 * Insert term
 * @param  {Object} term Terms object
 * @return {Promise}      Resolve/Reject
 */
function insert(term) {
  term.create_at = date.getDateUTC();
  term.modified_at = date.getDateUTC();

  return new termsModel(term).save();
}

/**
 * Update in DB
 * @param  {ObjectId} id Id which has to be updated
 * @param  {Object} term Term object
 * @return {Promise}        Resolve/Reject
 */
function update(id, term) {

  term.modified_at = date.getDateUTC();

  let query = {
    _id: id
  };

  let opt = {
    upsert: false,
    new: true
  };

  return termsModel
    .findOneAndUpdate(query, term, opt)
    .exec();
}

/**
 * Delete in DB
 * @param  {ObjectId} id Id which has to be deleted
 * @return {Promise}        Resolve/Reject
 */
function remove(id) {
  return termsModel.findByIdAndRemove(id)
    .exec();
}

/**
 * List all terms
 * @param  {Number} page Page number
 * @return {Promise}      Resolve/Reject
 */
function list(page) {
  let pageSize = parseInt(config.getPageSize());
  return termsModel.paginate(
    {
      //  active: true
    },
    {
      page: page,
      limit: pageSize,
      sort: {
        'created_at': 'descending'
      }
    });
}

/**
 * List the record in the DB that has the specified ObjectId
 * @param  {ObjectId} id Id which has to be listed
 * @return {Promise} Resolve/Reject
 */
function findById(id) {
  return termsModel.findById(id)
    .exec();
}

/**
 * Validate create
 * @param  {Object} term Term object
 * @return {Promise}      Resolve/Reject
 */
function validateCreate(term){
  term.content = checkField.trim(checkField.escape(term.content));

  return validator.validateSchema(term, termsSchema.termsCreateSchema);
}

/**
 * Validate update
 * @param  {Object} term Term object
 * @return {Promise}      Resolve/Reject
 */
function validateUpdate(term){
  term._id = checkField.trim(checkField.escape(term._id));
  term.content = checkField.trim(checkField.escape(term.content));

  return validator.validateSchema(term, termsSchema.termsUpdateSchema);
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
  findById: findById,
  model: termsModel
};

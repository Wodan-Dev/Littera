/**
 * Created by Cesar on 04/03/17.
 */
'use strict';
/**
 * Model Tags
 */

/**
 * Dependencies
 */
const core = require('../../modules/core');
const tagsSchema = require('./config/tags.schema');
const db = core.connection;
const date = core.date;
const config = core.config;
const validator = core.validator;
const checkField = core.validator.validator;
const tagsModel = db.database.model('tags', tagsSchema.tagsSchema);

/**
 * Insert tag
 * @param  {Object} tag Tags object
 * @return {Promise}      Resolve/Reject
 */
function insert(tag) {
  tag.create_at = date.getDateUTC();
  tag.modified_at = date.getDateUTC();

  return new tagsModel(tag).save();
}

/**
 * Update in DB
 * @param  {ObjectId} id Id which has to be updated
 * @param  {Object} tag Tag object
 * @return {Promise}        Resolve/Reject
 */
function update(id, tag) {

  tag.modified_at = date.getDateUTC();

  let query = {
    _id: id
  };

  let opt = {
    upsert: false,
    new: true
  };

  return tagsModel
    .findOneAndUpdate(query, tag, opt)
    .exec();
}

/**
 * Delete in DB
 * @param  {ObjectId} id Id which has to be deleted
 * @return {Promise}        Resolve/Reject
 */
function remove(id) {
  return tagsModel.findByIdAndRemove(id)
    .exec();
}

/**
 * List all tags
 * @param  {Number} page Page number
 * @return {Promise}      Resolve/Reject
 */
function list(page) {
  let pageSize = parseInt(config.getPageSize());
  return tagsModel.find({})
    .sort({ 'create_at': -1})
    .exec();
  /*return tagsModel.paginate(
    {
      //  active: true
    },
    {
      page: page,
      limit: pageSize,
      sort: {
        'create_at': 'descending'
      }
    })*/
}

/**
 * List the record in the DB that has the specified ObjectId
 * @param  {ObjectId} id Id which has to be listed
 * @return {Promise} Resolve/Reject
 */
function findById(id) {
  return tagsModel.findById(id)
    .exec();
}

/**
 * Validate create
 * @param  {Object} tag Tag object
 * @return {Promise}      Resolve/Reject
 */
function validateCreate(tag){
  tag.tag = checkField.trim(checkField.escape(tag.tag));

  return validator.validateSchema(tag, tagsSchema.tagsCreateSchema);
}

/**
 * Validate update
 * @param  {Object} tag Tag object
 * @return {Promise}      Resolve/Reject
 */
function validateUpdate(tag){
  tag._id = checkField.trim(checkField.escape(tag._id));
  tag.tag = checkField.trim(checkField.escape(tag.tag));

  return validator.validateSchema(tag, tagsSchema.tagsUpdateSchema);
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
  model: tagsModel
};

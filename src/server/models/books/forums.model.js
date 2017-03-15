/**
 * Created by César on 04/03/17.
 */
'use strict';
/**
 * Model Books
 */

/**
 * Dependencies
 */
const core = require('../../modules/core');
const forumsSchema = require('./config/forums.schema');
const date = core.date;
const validator = core.validator;
const checkField = core.validator.validator;
const booksModel = require('./books.model').model;

/**
 * Validate forum create
 * @param  {Object} book Forum object
 * @return {Promise}      Resolve/Reject
 */
function validateCreate(forum){
  forum._id_user = checkField.trim(checkField.escape(forum._id_user));
  forum.title = checkField.trim(checkField.escape(forum.title));
  forum.content = checkField.trim(checkField.escape(forum.content));

  return validator.validateSchema(forum, forumsSchema.forumsCreateSchema);
}

/**
 * Validate forum update
 * @param  {Object} book Forum object
 * @return {Promise}      Resolve/Reject
 */
function validateUpdate(forum){
  forum.title = checkField.trim(checkField.escape(forum.title));
  forum.content = checkField.trim(checkField.escape(forum.content));

  return validator.validateSchema(forum, forumsSchema.forumsUpdateSchema);
}

/**
 * Insert forum in DB
 * @param  {ObjectId} id Id which has to be updated
 * @param  {Object} forum forum object
 * @return {Promise}        Resolve/Reject
 */
function insert(id_book, forum) {

  forum.create_at = date.getDateUTC();
  forum.modified_at = date.getDateUTC();

  let query = {
    _id: id_book
  };

  let data = {
    $push: {
      forums: forum
    }
  };

  let opt = {
    upsert: false,
    new: true,
    safe: true
  };

  return booksModel
    .findOneAndUpdate(query, data, opt)
    .exec();
}

/**
 * Update forum in DB
 * @param  {ObjectId} id Id which has to be updated
 * @param  {Object} forum forum object
 * @return {Promise}        Resolve/Reject
 */
function update(id_book, forum) {

  let query = {
    '_id': id_book,
    'forums._id': forum._id
  };

  let data = {
    '$set': {
      'forums.$._id_user': forum._id_user,
      'forums.$.title': forum.title,
      'forums.$.content': forum.content,
      'forums.$.modified_at': date.getDateUTC()
    }
  };

  let opt = {
    upsert: false,
    new: true,
    safe: true
  };

  return booksModel
    .findOneAndUpdate(query, data, opt)
    .exec();
}

/**
 * Remove forum in DB
 * @param  {ObjectId} id Id which has to be updated
 * @param  {Object} forum forum object
 * @return {Promise}        Resolve/Reject
 */
function remove(id_book, id) {
  let query = {
    _id: id_book
  };

  let data = {
    $pull: {
      forums: {
        _id: id
      }
    }
  };

  let opt = {
    upsert: false,
    new: true,
    safe: true
  };

  return booksModel
    .findOneAndUpdate(query, data, opt)
    .exec();
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
  remove: remove
};

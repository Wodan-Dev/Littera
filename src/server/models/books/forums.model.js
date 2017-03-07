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
const booksSchema = require('./config/books.schema');
const forumsSchema = require('./config/forums.schema');
const db = core.connection;
const date = core.date;
const config = core.config;
const crypto = core.crypto;
const validator = core.validator;
const checkField = core.validator.validator;
const booksModel = db.database.model('books', booksSchema.booksSchema);

/**
 * Validate forum create
 * @param  {Object} book Forum object
 * @return {Promise}      Resolve/Reject
 */
function validateForumCreate(forum){
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
function validateForumUpdate(forum){
  forum.title = checkField.trim(checkField.escape(forum.title));
  forum.content = checkField.trim(checkField.escape(forum.content));

  return validator.validateSchema(forum, forumsSchema.forumsUpdateSchema);
}

/**
 * Insert forum in DB
 * @param  {ObjectId} id Id which has to be updated
 * @param  {Object} sale forum object
 * @return {Promise}        Resolve/Reject
 */
function insertForum(book_id, forum) {
  let query = {
    _id: book_id
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
function updateForum(book_id, id, forum) {
  let query = {
    '_id': book_id,
    'forums._id': forum._id
  };

  let data = {
    '$set': {
      'forums.$._id_user': forum._id_user,
      'forums.$.title': forum.title,
      'forums.$.content': forum.content
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
 * @param  {Object} sale forum object
 * @return {Promise}        Resolve/Reject
 */
function removeForum(book_id, id) {
  let query = {
    _id: book_id
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
  validateForumCreate: validateForumCreate,
  validateForumUpdate: validateForumUpdate,
  insertForum: insertForum,
  updateForum: updateForum,
  removeForum: removeForum
};

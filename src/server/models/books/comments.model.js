/**
 * Created by César on 12/03/17.
 */
'use strict';
/**
 * Model Books
 */

/**
 * Dependencies
 */
const core = require('../../modules/core');
const commentsSchema = require('./config/comments.schema');
const date = core.date;
const validator = core.validator;
const checkField = core.validator.validator;
const booksModel = require('./books.model').model;

/**
 * Validate comment create
 * @param  {Object} book Comment object
 * @return {Promise}      Resolve/Reject
 */
function validateCreate(comment){
  comment._id_user = checkField.trim(checkField.escape(comment._id_user));
  comment.content = checkField.trim(checkField.escape(comment.content));

  return validator.validateSchema(comment, commentsSchema.commentsCreateSchema);
}

/**
 * Validate comment update
 * @param  {Object} book Comment object
 * @return {Promise}      Resolve/Reject
 */
function validateUpdate(comment){
  comment._id = checkField.trim(checkField.escape(comment._id));
  comment._id_user = checkField.trim(checkField.escape(comment._id_user));
  comment.content = checkField.trim(checkField.escape(comment.content));

  return validator.validateSchema(comment, commentsSchema.commentsUpdateSchema);
}

/**
 * Insert comment in DB
 * @param  {ObjectId} id Id which has to be updated
 * @param  {Object} comment comment object
 * @return {Promise}        Resolve/Reject
 */
function insert(id_book, comment) {

  comment.create_at = date.getDateUTC();
  comment.modified_at = date.getDateUTC();

  let query = {
    _id: id_book
  };

  let data = {
    $push: {
      comments: comment
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
 * Update comment in DB
 * @param  {ObjectId} id Id which has to be updated
 * @param  {Object} comment comment object
 * @return {Promise}        Resolve/Reject
 */
function update(id_book, comment) {

  let query = {
    '_id': id_book,
    'comments._id': comment._id
  };

  let data = {
    '$set': {
      'comments.$._id_user': comment._id_user,
      'comments.$.content': comment.content,
      'comments.$.modified_at': date.getDateUTC()
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
 * Remove comment in DB
 * @param  {ObjectId} id Id which has to be updated
 * @param  {Object} comment comment object
 * @return {Promise}        Resolve/Reject
 */
function remove(id_book, id) {
  let query = {
    _id: id_book
  };

  let data = {
    $pull: {
      comments: {
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

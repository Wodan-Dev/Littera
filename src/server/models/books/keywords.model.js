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
const keywordsSchema = require('./config/keywords.schema');
const db = core.connection;
const date = core.date;
const config = core.config;
const crypto = core.crypto;
const validator = core.validator;
const checkField = core.validator.validator;
const booksModel = require('./books.model').model;

/**
 * Validate keyword create
 * @param  {Object} book Keyword object
 * @return {Promise}      Resolve/Reject
 */
function validateKeywordCreate(keyword){
  keyword.content = checkField.trim(checkField.escape(keyword.content));

  return validator.validateSchema(keyword, keywordsSchema.keywordsCreateSchema);
}

/**
 * Validate keyword update
 * @param  {Object} book Keyword object
 * @return {Promise}      Resolve/Reject
 */
function validateKeywordUpdate(keyword){
  keyword.content = checkField.trim(checkField.escape(keyword.content));

  return validator.validateSchema(keyword, keywordsSchema.keywordsUpdateSchema);
}

/**
 * Insert keyword in DB
 * @param  {ObjectId} id Id which has to be updated
 * @param  {Object} keyword keyword object
 * @return {Promise}        Resolve/Reject
 */
function insert(id_book, keyword) {

  keyword.create_at = date.getDateUTC();
  keyword.modified_at = date.getDateUTC();

  let query = {
    _id: id_book
  };

  let data = {
    $push: {
      keywords: keyword
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
 * Update keyword in DB
 * @param  {ObjectId} id Id which has to be updated
 * @param  {Object} keyword keyword object
 * @return {Promise}        Resolve/Reject
 */
function update(id_book, keyword) {

  let query = {
    '_id': id_book,
    'keywords._id': keyword._id
  };

  let data = {
    '$set': {
      'keywords.$.content': keyword.content,
      'keywords.$.modified_at': date.getDateUTC()
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
 * Remove keyword in DB
 * @param  {ObjectId} id Id which has to be updated
 * @param  {Object} keyword keyword object
 * @return {Promise}        Resolve/Reject
 */
function remove(id_book, id) {
  let query = {
    _id: id_book
  };

  let data = {
    $pull: {
      keywords: {
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
  validateKeywordCreate: validateKeywordCreate,
  validateKeywordUpdate: validateKeywordUpdate,
  insert: insert,
  update: update,
  remove: remove
};

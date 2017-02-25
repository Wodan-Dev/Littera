'use strict';

/**
 * Module Books
 */

/**
 * Dependencies
 */
const core = require('../../core');
const booksSchema = require('../config/books.schema');
const db = core.connection;
const date = core.date;
const config = core.config;
const crypto = core.crypto;
const validator = core.validator;
const checkField = core.validator.validator;
const booksModel = db.database.model('books', booksSchema.booksSchema);

/**
 * Insert book
 * @param  {Object} book Book object
 * @return {Promise}      Resolve/Reject
 */
function insert(book) {
  return new booksModel(book).save();
}

/**
 * Update in DB
 * @param  {ObjectId} id Id which has to be updated
 * @param  {Object} book Book object
 * @return {Promise}        Resolve/Reject
 */
function update(id, book) {
  let query = {
    _id: id
  };

  let opt = {
    upsert: false,
    new: true
  };

  return booksModel
    .findOneAndUpdate(query, book, opt)
    .exec();
}

/**
 * Delete in DB
 * @param  {ObjectId} id Id which has to be deleted
 * @return {Promise}        Resolve/Reject
 */
function remove(id) {
  return booksModel.findByIdAndRemove(id)
    .exec();
}

/**
 * List all books
 * @param  {Number} page Page number
 * @return {Promise}      Resolve/Reject
 */
function list(page) {
  let pageSize = parseInt(config.getPageSize());
  return booksModel.paginate(
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
  return booksModel.findById(id)
    .exec();
}

/**
 * Validate create
 * @param  {Object} book Book object
 * @return {Promise}      Resolve/Reject
 */
function validateCreate(book){
  book.title = checkField.trim(checkField.escape(book.title));
  book.synopsis = checkField.trim(checkField.escape(book.synopsis));
  book.content = checkField.trim(checkField.escape(book.content));
  book.esbn = checkField.trim(checkField.escape(book.esbn));
  book.language = checkField.trim(checkField.escape(book.language));

  return validator.validateSchema(book, booksSchema.booksCreateSchema);
}

/**
 * Validate update
 * @param  {Object} book Book object
 * @return {Promise}      Resolve/Reject
 */
function validateUpdate(book){
  book._id = checkField.trim(checkField.escape(book._id));
  book.title = checkField.trim(checkField.escape(book.title));
  book.synopsis = checkField.trim(checkField.escape(book.synopsis));
  book.content = checkField.trim(checkField.escape(book.content));
  book.esbn = checkField.trim(checkField.escape(book.esbn));
  book.language = checkField.trim(checkField.escape(book.language));

  return validator.validateSchema(book, booksSchema.booksUpdateSchema);
}

/**
 * Validate ID
 * @param  {Object} id Id which has to be validated
 * @return {Promise}    Resolve/Reject
 */
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
  findById: findById
};

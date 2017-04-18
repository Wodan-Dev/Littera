/**
 * Created by jonathan on 29/03/17.
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
const writtenBooksSchema = require('./config/written_books.schema');
const db = core.connection;
const date = core.date;
const config = core.config;
const validator = core.validator;
const checkField = core.validator.validator;


/**
 * Insert in DB
 * @param  {ObjectId} id user id
 * @param  {Object} book book object
 * @return {Promise}        Resolve/Reject
 */
function insert(id, book) {

  console.log('book');
  console.log(book);
  let query = {
    _id: db.getObjectId(id)
  };

  let data = {
    $push: {
      written_books: {
        _id_book: db.getObjectId(book._id_book)
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
 * Delete in DB
 * @param  {Object} book book which has to be deleted
 * @return {Promise}        Resolve/Reject
 */
function remove(book) {
  let query = {
    _id: book._id
  };

  let data = {
    $pull: {
      written_books: {
        _id_book: book._id_book
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
 * @param  {String} user username
 * @param  {Number} page number of page
 * @return {Promise} Resolve/Reject
 */
function listByUser(user, page) {
  let pageSize = parseInt(config.getPageSize());

  return usersModel.findOne({ username: user })
    .populate('written_books._id_book', 'cover_image title date_published')
    .exec();
}


/**
 * Update in DB
 * @param  {ObjectId} idUser user id
 * @param  {ObjectId} idBook book id
 * @return {Promise}        Resolve/Reject
 */
function alreadyWritten(idUser, idBook) {
  let query = {
    _id: idUser,
    'written_books._id_book': idBook
  };

  return usersModel
    .findOne(query)
    .exec();
}

/**
 * Validate create
 * @param  {Object} book book object
 * @return {Promise}      Resolve/Reject
 */
function validateCreate(book) {

  book._id_book = checkField.trim(checkField.escape(book._id_book));

  return validator.validateSchema(book, writtenBooksSchema.written_booksCreateSchema);
}


/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  validateCreate: validateCreate,
  insert: insert,
  remove: remove,
  listByUser: listByUser,
  alreadyWritten: alreadyWritten
};


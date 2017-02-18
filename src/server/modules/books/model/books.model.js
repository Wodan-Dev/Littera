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

function insert(book) {
  return new booksModel(book).save();
}

/**
 * List all register in DB
 * @return {Promise} Resolve/Reject
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

function validateCreate(book){
  book.title = checkField.trim(checkField.escape(book.title));
  book.synopsis = checkField.trim(checkField.escape(book.synopsis));
  book.content = checkField.trim(checkField.escape(book.content));
  book.esbn = checkField.trim(checkField.escape(book.esbn));
  book.language = checkField.trim(checkField.escape(book.language));

  return validator.validateSchema(book, booksSchema.booksCreateSchema);
}

module.exports = {
  validateCreate: validateCreate,
  //validateUpdate: validateUpdate,
  insert: insert,
  list: list
};

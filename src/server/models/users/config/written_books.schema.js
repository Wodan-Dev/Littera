'use strict';

/**
 * Module users
 */

/**
 * Dependencies
 */

const core = require('../../../modules/core');
const date = core.date;
const db = core.connection;
const models = core.validator.models;
const schema = core.validator.schema;

/**
 * Written_books Schema Definition
 * @type {Schema}
 */
const written_booksSchema = new db.mongoose.Schema({
  _id_book: {
    type: db.types.ObjectId,
    ref: 'books',
    required: true,
    index: true
  }
});

/**
 * Written_books Schema create validation
 * @type {Object}
 */
const written_booksCreateSchema = schema({
  _id_book: models.stringField(true)
});

/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  written_booksSchema: written_booksSchema,
  written_booksCreateSchema: written_booksCreateSchema
};

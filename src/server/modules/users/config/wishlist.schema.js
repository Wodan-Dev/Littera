'use strict';

/**
 * Module users
 */

/**
 * Dependencies
 */

const core = require('../../core');
const date = core.date;
const db = core.connection;
const models = core.validator.models;
const schema = core.validator.schema;

/**
 * wishList Schema Definition
 * @type {Schema}
 */
const wishListSchema = new db.mongoose.Schema({
  _id_book: {
    type: db.types.ObjectId,
    ref: 'books',
    required: true,
    index: true
  },
  date_saved: {
    type: Date,
    required: true
  }
});

/**
 * wishList Schema create validation
 * @type {Object}
 */
const wishListCreateSchema = schema({
  _id_book: models.stringField(true)
});

/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  wishListSchema: wishListSchema,
  wishListCreateSchema: wishListCreateSchema
};

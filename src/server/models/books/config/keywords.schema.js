'use strict';

/**
 * Module Books
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
 * Keywords Schema Definition
 * @type {Schema}
 */
const keywordsSchema = new db.mongoose.Schema({
  content: {
    type: String,
    required: true,
    index: true
  },
  create_at: {
    type: Date,
    required: true,
    default: date.getDateUTC()
  },
  modified_at: {
    type: Date,
    required: true,
    default: date.getDateUTC()
  }
});

/**
 * Keywords Schema create validation
 * @type {Object}
 */
const keywordsCreateSchema = schema({
  content: models.stringField(true).max(30)
});

/**
 * Keywords Schema update validation
 * @type {Object}
 */
const keywordsUpdateSchema = schema({
  _id: models.stringField(true),
  content: models.stringField(true).max(30)
});

/**
 * Module exports
 * @type {Object}
 */
module.exports = {
  keywordsSchema: keywordsSchema,
  keywordsCreateSchema: keywordsCreateSchema,
  keywordsUpdateSchema: keywordsUpdateSchema
};

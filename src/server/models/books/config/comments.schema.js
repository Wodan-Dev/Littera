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
 * Comments Schema Definition
 * @type {Schema}
 */
const commentsSchema = new db.mongoose.Schema({
  _id_user: {
    type: db.types.ObjectId,
    ref: 'users',
    required: true,
    index: true
  },
  content: {
    type: String,
    required: true
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
 * Comments Schema create validation
 * @type {Object}
 */
const commentsCreateSchema = schema({
  _id_user: models.stringField(true),
  content: models.stringField(true).max(1000)
});

/**
 * Comments Schema update validation
 * @type {Object}
 */
const commentsUpdateSchema = schema({
  _id: models.stringField(true),
  _id_user: models.stringField(true),
  content: models.stringField(true).max(1000)
});

/**
 * Module exports
 * @type {Object}
 */
module.exports = {
  commentsSchema: commentsSchema,
  commentsCreateSchema: commentsCreateSchema,
  commentsUpdateSchema: commentsUpdateSchema
};

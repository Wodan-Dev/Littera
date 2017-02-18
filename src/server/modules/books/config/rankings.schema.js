'use strict';

/**
 * Module Books
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
 * Ranking Schema Definition
 * @type {Schema}
 */
const rankingsSchema = new db.mongoose.Schema({
  _id_user: {
    type: db.types.ObjectId,
    ref: 'users',
    required: true,
    index: true
  },
  stars: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  comment: {
    type: String,
    required: true
  },
  created_at: {
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
 * Rankings Schema create validation
 * @type {Object}
 */
const rankingsCreateSchema = schema({
  stars: models.numberField(true).min(0).max(5),
  comment: models.stringField(true)
});

/**
 * Rankings Schema update validation
 * @type {Object}
 */
const rankingsUpdateSchema = schema({
  _id: models.stringField(true),
  stars: models.numberField(true).min(0).max(5),
  comment: models.stringField(true)
});

/**
 * Module exports
 * @type {Object}
 */
module.exports = {
  rankingsSchema: rankingsSchema,
  rankingsCreateSchema: rankingsCreateSchema,
  rankingsUpdateSchema: rankingsUpdateSchema
};

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
 * Prices Schema Definition
 * @type {Schema}
 */
const pricesSchema = new db.mongoose.Schema({
  price_min: {
    type: Number,
    required: true,
    index: true
  },
  price_sug: {
    type: Number,
    required: true,
    index: true
  },
  date_begin: {
    type: Date,
    required: true
  },
  date_end: {
    type: Date,
    required: true
  },
  type: {
    type: Number,
    required: true,
    enum: [0, 1]
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
 * Prices Schema create validation
 * @type {Object}
 */
const pricesCreateSchema = schema({
  price_min: models.numberField(true),
  price_sug: models.numberField(true),
  date_begin: models.dateField(true),
  date_end: models.dateField(),
  type: models.numberField(true).min(0).max(1)
});

/**
 * Prices Schema update validation
 * @type {Object}
 */
const pricesUpdateSchema = schema({
  _id: models.stringField(true),
  price_min: models.numberField(true),
  price_sug: models.numberField(true),
  date_begin: models.dateField(true),
  date_end: models.dateField(),
  type: models.numberField(true).min(0).max(1)
});

/**
 * Module exports
 * @type {Object}
 */
module.exports = {
  pricesSchema: pricesSchema,
  pricesCreateSchema: pricesCreateSchema,
  pricesUpdateSchema: pricesUpdateSchema
};

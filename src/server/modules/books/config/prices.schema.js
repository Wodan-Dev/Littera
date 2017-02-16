'use strict';

/**
 * Modulo Prices
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
 * Prices Schema
 * @type {Schema}
 */
const pricesSchema = db.mongoose.Schema({
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

module.exports = pricesSchema;

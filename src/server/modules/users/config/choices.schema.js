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
 * Choices Schema Definition
 * @type {Schema}
 */
const choicesSchema = new db.mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  create_at: {
    type: Date,
    required: true,
    default: date.getDateUTC(),
    index: true
  },
  modified_at: {
    type: Date,
    required: true,
    default: date.getDateUTC(),
    index: true
  }
});

/**
 * Choices Schema create validation
 * @type {Object}
 */
const choicesCreateSchema = schema({
  content: models.stringField(true).max(1000)
});

/**
 * Choices Schema update validation
 * @type {Object}
 */
const choicesUpdateSchema = schema({
  _id: models.stringField(true),
  content: models.stringField(true).max(1000)
});


/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  choicesSchema: choicesSchema,
  choicesCreateSchema: choicesCreateSchema,
  choicesUpdateSchema: choicesUpdateSchema
};

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
 * Opinions Schema Definition
 * @type {Schema}
 */
const opinionsSchema = new db.mongoose.Schema({
  _id_user: {
    type: db.types.ObjectId,
    ref: 'users',
    required: true,
    index: true
  },
  stars: {
    type: Number,
    index: true
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
  },
  comment: {
    type: String,
    required: true
  }
});


/**
 * Opinions Schema create validation
 * @type {Object}
 */
const opinionsCreateSchema = schema({
  _id_user: models.stringField(true),
  stars: models.numberField().integer(),
  create_at: models.dateField(true),
  modified_at: models.dateField(true),
  comment: models.stringField(true).max(1000)
});

/**
 * Opinions Schema update validation
 * @type {Object}
 */
const opinionsUpdateSchema = schema({
  _id: models.stringField(true),
  _id_user: models.stringField(true),
  stars: models.numberField().integer(),
  create_at: models.dateField(true),
  modified_at: models.dateField(true),
  comment: models.stringField(true).max(1000)
});


/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  opinionsSchema: opinionsSchema,
  opinionsCreateSchema: opinionsCreateSchema,
  opinionsUpdateSchema: opinionsUpdateSchema
};

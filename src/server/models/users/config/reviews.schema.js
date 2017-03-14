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
 * Reviews Schema Definition
 * @type {Schema}
 */
const reviewsSchema = new db.mongoose.Schema({
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
    default: date.getDateUTC()
  },
  modified_at: {
    type: Date,
    required: true,
    default: date.getDateUTC()
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
const reviewsCreateSchema = schema({
  _id_user: models.stringField(true),
  stars: models.numberField().integer(),
  comment: models.stringField(true).max(1000)
});

/**
 * Opinions Schema update validation
 * @type {Object}
 */
const reviewsUpdateSchema = schema({
  _id_review: models.stringField(true),
  _id_user: models.stringField(true),
  stars: models.numberField().integer(),
  comment: models.stringField(true).max(1000)
});


/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  reviewsSchema: reviewsSchema,
  reviewsCreateSchema: reviewsCreateSchema,
  reviewsUpdateSchema: reviewsUpdateSchema
};

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
 * Rankings Schema Definition
 * @type {Schema}
 */
const rankingSchema = new db.mongoose.Schema({
  _id_user: {
    type: db.types.ObjectId,
    ref: 'users',
    required: true,
    index: true
  },
  stars: {
    type: Number,
    required: true,
    index: true,
    enum: [0, 1, 2, 3, 4, 5],
    default: 0
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
 * Rankings Schema create validation
 * @type {Object}
 */
const rankingCreateSchema = schema({
  _id_user: models.stringField(true),
  stars: models.numberField(true).integer().min(0).max(5),
  date_modified: models.dateField(true),
  comment: models.stringField(true).max(1000)
});

/**
 * Rankings Schema update validation
 * @type {Object}
 */
const rankingUpdateSchema = schema({
  _id: models.stringField(true),
  _id_user: models.stringField(true),
  stars: models.numberField(true).integer().min(0).max(5),
  date_modified: models.dateField(true),
  comment: models.stringField(true).max(1000)
});


/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  rankingSchema: rankingSchema,
  rankingCreateSchema: rankingCreateSchema,
  rankingUpdateSchema: rankingUpdateSchema
};

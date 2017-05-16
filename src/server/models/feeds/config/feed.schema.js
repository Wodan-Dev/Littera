/**
 * Created by jonathan on 29/03/17.
 */
'use strict';
/**
 * Model feed
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
 * Feed Schema Definition
 * @type {Schema}
 */
const feedSchema = new db.mongoose.Schema({
  _id_user: {
    type: db.types.ObjectId,
    ref: 'users',
    required: true,
    index: true
  },
  _id_book: {
    type: db.types.ObjectId,
    ref: 'books',
    required: true,
    index: true
  },
  type_feed: {
    type: Number,
    required: true,
    index: true,
    default: 0,
    enum: [0, 1]
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

feedSchema.plugin(db.mongoosePaginate);

/**
 * Feed Schema create validation
 * @type {Object}
 */
const feedCreateSchema = schema({
  _id_user: models.stringField(true).max(1000),
  _id_book: models.stringField(true).max(1000),
  type_feed: models.numberField(true).min(0).max(1)
});



/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  feedSchema: feedSchema,
  feedCreateSchema: feedCreateSchema
};

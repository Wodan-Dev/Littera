'use strict';

/**
 * Module Books
 */

/**
* Dependencies
*/
const core = require('../../../modules/core');
const db = core.connection;
const date = core.date;
const models = core.validator.models;
const schema = core.validator.schema;

/**
 * Forums Schema
 * @type {Schema}
 */
const postsSchema = new db.mongoose.Schema({
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
  spoiler: {
    type: Number,
    required: true,
    default: 0
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
 * Post Schema create validation
 * @type {Object}
 */
const postsCreateSchema = schema({
  _id_user: models.stringField(true),
  content: models.stringField(true).max(100),
  spoiler: models.numberField(true).min(0).max(1)
});

/**
 * Post Schema update validation
 * @type {Object}
 */
const postsUpdateSchema = schema({
  _id: models.stringField(true),
  _id_user: models.stringField(true),
  content: models.stringField(true).max(100),
  spoiler: models.numberField(true).min(0).max(1)
});


/**
 * Module exports
 * @type {Object}
 */
module.exports = {
  postsSchema: postsSchema,
  postsCreateSchema: postsCreateSchema,
  postsUpdateSchema: postsUpdateSchema
};

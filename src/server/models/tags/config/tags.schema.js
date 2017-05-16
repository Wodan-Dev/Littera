'use strict';

/**
 * Module Tags
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
 * Tags Schema Definition
 * @type {Schema}
 */
const tagsSchema = new db.mongoose.Schema({
  tag: {
    type: String,
    required: true,
    index: true,
    unique: true
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

tagsSchema.plugin(db.mongoosePaginate);

/**
 * Tags Schema create validation
 * @type {Object}
 */
const tagsCreateSchema = schema({
  tag: models.stringField(true).max(30)
});

/**
 * Tags Schema update validation
 * @type {Object}
 */
const tagsUpdateSchema = schema({
  _id: models.stringField(true),
  tag: models.stringField(true).max(30)
});

/**
 * Module exports
 * @type {Object}
 */
module.exports = {
  tagsSchema: tagsSchema,
  tagsCreateSchema: tagsCreateSchema,
  tagsUpdateSchema: tagsUpdateSchema
};

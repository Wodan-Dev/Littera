'use strict';

/**
 * Module Terms
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
 * Terms Schema Definition
 * @type {Schema}
 */
const termsSchema = new db.mongoose.Schema({
  content: {
    type: String,
    required: true,
    index: true
  },
  status: {
    type: Number,
    required: true,
    default: 1,
    enum: [0, 1]
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

termsSchema.plugin(db.mongoosePaginate);

/**
 * Terms Schema create validation
 * @type {Object}
 */
const termsCreateSchema = schema({
  content: models.stringField(true),
  status: models.numberField(true).integer().min(0).max(1)
});

/**
 * Terms Schema update validation
 * @type {Object}
 */
const termsUpdateSchema = schema({
  _id: models.stringField(true),
  content: models.stringField(true),
  status: models.numberField(true).integer().min(0).max(1)
});

/**
 * Module exports
 * @type {Object}
 */
module.exports = {
  termsSchema: termsSchema,
  termsCreateSchema: termsCreateSchema,
  termsUpdateSchema: termsUpdateSchema
};

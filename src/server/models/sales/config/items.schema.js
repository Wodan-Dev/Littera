/**
 * Created by jonathan on 05/03/17.
 */
'use strict';
/**
 * Model sales
 */

/**
 * Dependencies
 */
const core = require('../../../modules/core');
const db = core.connection;
const models = core.validator.models;
const schema = core.validator.schema;

/**
 * Items Schema Definition
 * @type {Schema}
 */
const itemsSchema = new db.mongoose.Schema({
  _id_book: {
    type: db.types.ObjectId,
    ref: 'books',
    required: true,
    index: true
  },
  value: {
    type: Number,
    required: true,
    default: 0
  }
});

/**
 * Items Schema create validation
 * @type {Object}
 */
const itemsCreateSchema = schema({
  _id_book: models.stringField(true),
  value: models.numberField(true).min(0)
});

/**
 * Module exports
 * @type {Object}
 */
module.exports = {
  itemsSchema: itemsSchema,
  itemsCreateSchema: itemsCreateSchema
};

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
const itemsSchema = require('./items.schema');
const date = core.date;
const db = core.connection;
const models = core.validator.models;
const schema = core.validator.schema;

/**
 * Sales Schema Definition
 * @type {Schema}
 */
const salesSchema = new db.mongoose.Schema({
  _id_user: {
    type: db.types.ObjectId,
    ref: 'books',
    required: true,
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
  transaction_id: {
    type: String,
    required: true
  },
  payment_url: {
    type: String,
    required: false
  },
  status: {
    type: Number,
    required: true,
    default: 0,
    enum: [0, 1, 2, 3]
  },
  checksum: {
    type: String,
    required: true,
    default: '-'
  },
  items : [
    itemsSchema.itemsSchema
  ]
});

salesSchema.plugin(db.mongoosePaginate);

/**
 * Sales Schema create validation
 * @type {Object}
 */
const salesCreateSchema = schema({
  _id_user: models.stringField(true),
  transaction_id: models.stringField(true),
  status: models.numberField().integer().min(0).max(3),
  items: models.nestedArray(false, itemsSchema.itemsCreateSchema)
});

/**
 * Module exports
 * @type {Object}
 */
module.exports = {
  salesSchema: salesSchema,
  salesCreateSchema: salesCreateSchema
};

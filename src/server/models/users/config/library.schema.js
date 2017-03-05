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
 * Library Schema Definition
 * @type {Schema}
 */
const librarySchema = new db.mongoose.Schema({
  _id_book: {
    type: db.types.ObjectId,
    ref: 'books',
    required: true,
    index: true
  },
  date_saved: {
    type: Date,
    required: true,
    default: date.getDateUTC()
  },
  favorite: {
    type: Number,
    required: true,
    enum: [0, 1],
    default: 0
  },
  visible: {
    type: Number,
    required: true,
    enum: [0, 1, 2],
    default: 0
  }
});

/**
 * Library Schema create validation
 * @type {Object}
 */
const libraryCreateSchema = schema({
  _id_book: models.stringField(true),
  date_saved: models.dateField(true),
  favorite: models.numberField(true).integer().min(0).max(1),
  visible:  models.numberField(true).integer().min(0).max(2)
});

/**
 * Library Schema update validation
 * @type {Object}
 */
const libraryUpdateSchema = schema({
  _id: models.stringField(true),
  _id_book: models.stringField(true),
  date_saved: models.dateField(true),
  favorite: models.numberField(true).integer().min(0).max(1),
  visible:  models.numberField(true).integer().min(0).max(2)
});

/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  librarySchema: librarySchema,
  libraryCreateSchema: libraryCreateSchema,
  libraryUpdateSchema: libraryUpdateSchema
};

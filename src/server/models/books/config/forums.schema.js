'use strict';

/**
 * Module Books
 */

/**
 * Dependencies
 */
const core = require('../../../modules/core');
const postsSchema = require('./posts.schema');
const date = core.date;
const db = core.connection;
const models = core.validator.models;
const schema = core.validator.schema;

/**
 * Forums Schema Definition
 * @type {Schema}
 */
const forumsSchema = new db.mongoose.Schema({
  _id_user: {
    type: db.types.ObjectId,
    ref: 'users',
    required: true,
    index: true
  },
  title: {
    type: String,
    required: true,
    index: true
  },
  content: {
    type: String,
    required: true
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
  posts: [
    postsSchema.postsSchema
  ]
});

/**
 * Forums Schema create validation
 * @type {Object}
 */
const forumsCreateSchema = schema({
  _id_user: models.stringField(true),
  title: models.stringField(true),
  content: models.stringField(true).max(1000)/*,
  posts: models.nestedArray(false, postsSchema.postsCreateSchema)*/
});

/**
 * Forums Schema create validation
 * @type {Object}
 */
const forumsUpdateSchema = schema({
  _id: models.stringField(true),
  _id_user: models.stringField(true),
  title: models.stringField(true),
  content: models.stringField(true).max(1000)/*,
  posts: models.nestedArray(false, postsSchema.postsUpdateSchema)*/
});

/**
 * Module exports
 * @type {Object}
 */
module.exports = {
  forumsSchema: forumsSchema,
  forumsCreateSchema: forumsCreateSchema,
  forumsUpdateSchema: forumsUpdateSchema
};

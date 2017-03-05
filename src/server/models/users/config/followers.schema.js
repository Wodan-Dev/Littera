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
 * Followers Schema Definition
 * @type {Schema}
 */
const followersSchema = new db.mongoose.Schema({
  _id_user_follow: {
    type: db.types.ObjectId,
    ref: 'users',
    required: true,
    index: true
  },
  date_followed: {
    type: Date,
    required: true
  }
});

/**
 * Followers Schema create validation
 * @type {Object}
 */
const followersCreateSchema = schema({
  _id_user_follow: models.stringField(true)
});

/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  followersSchema: followersSchema,
  followersCreateSchema: followersCreateSchema
};

'use strict';

/**
 * Module users
 */

/**
 * Dependencies
 */
const core = require('../../core');
const opinionsSchema = require('./opinions.schema');
const choicesSchema = require('./choices.schema');
const followersSchema = require('./followers.schema');
const followingSchema = require('./following.schema');
const wishlistSchema = require('./wishlist.schema');
const librarySchema = require('./library.schema');
const written_booksSchema = require('./written_books.schema');
const date = core.date;
const db = core.connection;
const models = core.validator.models;
const schema = core.validator.schema;

/**
 * Users Schema Definition
 * @type {Schema}
 */
const usersSchema = new db.mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  gender: {
    type: Number,
    required: true,
    default: 0
  },
  dob: {
    type: Date,
    required: true,
    index: true
  },
  profile_img: {
    type: String
  },
  average_stars: {
    type: Number,
    required: true,
    index: true,
    default: 0
  },
  acepted_terms: {
    type: Number,
    required: true,
    default: 0
  },
  payment: {
    payment_id: {
      type: String
    }
  },
  opinions: [
    opinionsSchema.opinionsSchema
  ],
  choices: [
    choicesSchema.choicesSchema
  ],
  followers: [
    followersSchema.followersSchema
  ],
  following: [
    followingSchema.followingSchema
  ],
  wishlist: [
    wishlistSchema.wishListSchema
  ],
  library: [
    librarySchema.librarySchema
  ],
  written_books: [
    written_booksSchema.written_booksSchema
  ]
});

usersSchema.plugin(db.mongoosePaginate);

/**
 * Users Schema create validation
 * @type {Object}
 */
const usersCreateSchema = schema({
  name: models.stringField(true).min(5).max(100),
  gender: models.numberField(true).integer().min(0).max(2),
  dob: models.dateField(true),
  profile_img: models.stringField(),
  average_stars: models.numberField(true).min(0).max(5),
  acepted_terms: models.numberField(true).min(0).max(1)
});

/**
 * Users Schema update validation
 * @type {Object}
 */
const usersUpdateSchema = schema({
  _id: models.stringField(true),
  name: models.stringField(true).min(5).max(100),
  gender: models.numberField(true).integer().min(0).max(2),
  dob: models.dateField(true),
  profile_img: models.stringField(),
  average_stars: models.numberField(true).min(0).max(5),
  acepted_terms: models.numberField(true).min(0).max(1)
});

/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  usersSchema: usersSchema,
  usersCreateSchema: usersCreateSchema,
  usersUpdateSchema: usersUpdateSchema
};

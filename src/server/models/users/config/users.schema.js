'use strict';

/**
 * Module users
 */

/**
 * Dependencies
 */
const core = require('../../../modules/core');
const reviewsSchema = require('./reviews.schema');
const choicesSchema = require('./choices.schema');
const followersSchema = require('./followers.schema');
const followingSchema = require('./following.schema');
const wishListSchema = require('./wishlist.schema');
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
  username: {
    type: String,
    unique: true,
    required: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    bcrypt: true
  },
  last_login: {
    type: Date
  },
  cover_image: {
    type: String
  },
  name: {
    type: String,
    index: true
  },
  gender: {
    type: Number,
    required: true,
    default: 0
  },
  dob: {
    type: Date,
    index: true
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
    type: String
  },
  status: {
    type: Boolean,

    required: true,
    default: true
  },
  is_staff: {
    type: Boolean,
    required: true,
    default: false
  },
  create_at:	{
    type: Date,
    required: true,
    default: date.getDateUTC()
  },
  modified_at:	{
    type: Date,
    required: true,
    default: date.getDateUTC()
  },
  checksum: {
    type: String,
    required: true,
    default: '-'
  },
  reviews: [
    reviewsSchema.reviewsSchema
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
    wishListSchema.wishListSchema
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
  cover_image: models.stringField(false),
  dob: models.dateField(true),
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
  cover_image: models.stringField(false),
  dob: models.dateField(false),
  average_stars: models.numberField(true).min(0).max(5),
  acepted_terms: models.numberField(true).min(0).max(1),
  payment: models.stringField(false),
  choices: models.nestedArray(false, choicesSchema.choicesCreateSchema)
});

/**
 * Users Schema create validation
 * @type {Object}
 */
const newUsersCreateSchema = schema({
  name: models.stringField(true).min(5).max(100),
  username: models.stringField(true).min(5).max(30),
  email: models.stringField(true).email(),
  password: models.stringField(true).min(8),
  passwordbis: models.stringField(true).min(8),
  acepted_terms:models.numberField(true).integer().min(0).max(1)
});

/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  usersSchema: usersSchema,
  usersCreateSchema: usersCreateSchema,
  usersUpdateSchema: usersUpdateSchema,
  newUsersCreateSchema: newUsersCreateSchema
};

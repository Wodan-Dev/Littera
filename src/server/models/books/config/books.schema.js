'use strict';

/**
 * Module Books
 */

/**
 * Dependencies
 */
const core = require('../../../modules/core');
const pricesSchema = require('./prices.schema');
const forumsSchema = require('./forums.schema');
const rankingsSchema = require('./rankings.schema');
const keywordsSchema = require('./keywords.schema');
const commentsSchema = require('./comments.schema');
const date = core.date;
const db = core.connection;
const models = core.validator.models;
const schema = core.validator.schema;

/**
 * Books Schema Definition
 * @type {Schema}
 */
const booksSchema = new db.mongoose.Schema({
  cover_image: {
    type: String
  },
  title: {
    type: String,
    required: true,
    index: true
  },
  synopsis: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  status: {
    type: Number,
    required: true,
    default: 0,
    enum: [0, 1]
  },
  percentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  esbn: {
    type: String,
    required: false
  },
  date_published: {
    type: Date,
    required: false,
    index: true
  },
  visible: {
    type: Number,
    required: true,
    enum: [0, 1, 2]
  },
  language: {
    type: String,
    required: true,
    index: true
  },
  average_star: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  created_at: {
    type: Date,
    required: true,
    default: date.getDateUTC()
  },
  modified_at: {
    type: Date,
    required: true,
    default: date.getDateUTC()
  },
  prices: [
    pricesSchema.pricesSchema
  ],
  forums: [
    forumsSchema.forumsSchema
  ],
  rankings: [
    rankingsSchema.rankingsSchema
  ],
  keywords: [
    keywordsSchema.keywordsSchema
  ],
  comments: [
    commentsSchema.commentsSchema
  ]

});

booksSchema.plugin(db.mongoosePaginate);

/**
 * Books Schema create validation
 * @type {Object}
 */
const booksCreateSchema = schema({
  title: models.stringField(true),
  synopsis: models.stringField(true),
  content: models.stringField(true),
  status: models.numberField(true).integer().min(0).max(1),
  percentage: models.numberField(true).integer().min(0).max(100),
  esbn: models.stringField(false),
  date_published: models.dateField(false).allow(''),
  visible: models.numberField().integer().min(0).max(2),
  language: models.stringField(true),
  average_star: models.numberField().min(0).max(5)/*,
  prices: models.nestedArray(false, pricesSchema.pricesSchema),
  forums: models.nestedArray(false, forumsSchema.forumsSchema),
  rankings: models.nestedArray(false, rankingsSchema.rankingsSchema),
  keywords: models.nestedArray(false, keywordsSchema.keywordsSchema),
  comments: models.nestedArray(false, commentsSchema.commentsSchema)*/
});

/**
 * Books Schema update validation
 * @type {Object}
 */
const booksUpdateSchema = schema({
  _id: models.stringField(true),
  title: models.stringField(true),
  synopsis: models.stringField(true),
  content: models.stringField(true),
  status: models.numberField(true).integer().min(0).max(1),
  percentage: models.numberField(true).integer().min(0).max(100),
  esbn: models.stringField(false),
  date_published: models.dateField(false).allow(''),
  visible: models.numberField().integer().min(0).max(2),
  language: models.stringField(true),
  average_star: models.numberField().min(0).max(5)/*,
  prices: models.nestedArray(false, pricesSchema.pricesSchema),
  forums: models.nestedArray(false, forumsSchema.forumsSchema),
  rankings: models.nestedArray(false, rankingsSchema.rankingsSchema),
  keywords: models.nestedArray(false, keywordsSchema.keywordsSchema),
  comments: models.nestedArray(false, commentsSchema.commentsSchema)*/
});

/**
 * Module exports
 * @type {Object}
 */
module.exports = {
  booksSchema: booksSchema,
  booksCreateSchema: booksCreateSchema,
  booksUpdateSchema: booksUpdateSchema
};
'use strict';

/**
 * Module books
 */

const core = require('../../core');
const priceSchema = require('./price.Schema');
const forumsSchema = require('./forums.Schema');
const date = core.date;
const db = core.connection;
const models = core.validator.models;
const schema = core.validator.schema;

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
    required: true,
    index: true
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
    type: String
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
    max: 100
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
  price: [
    priceSchema
  ],
  forums: [
    forumsSchema
  ]

});

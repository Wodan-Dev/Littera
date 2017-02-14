'use strict';

/**
 * Module users
 */

/**
 * Dependencies
 */

const core = require('../../core');
const date = core.date;
const db = core.connection;
const models = core.validator.models;
const schema = core.validator.schema;


const commentsSchema = new db.mongoose.Schema({
  _id_user: {
    type: db.types.ObjectId,
    ref: 'users',
    required: true,
    index: true
  },
  create_at: {
    type: Date,
    required: true,
    default: date.getDateUTC(),
    index: true
  },
  modified_at: {
    type: Date,
    required: true,
    default: date.getDateUTC(),
    index: true
  },
  content: {
    type: String,
    required: true
  }
});
/*
_id	ObjectId	SIM
_id_user	ObjectId	SIM
date_modified	date	SIM	sysdate
content	String	SIM*/

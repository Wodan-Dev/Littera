/**
 * Created by César on 12/03/17.
 */
'use strict';
/**
 * Model Books
 */

/**
 * Dependencies
 */
const core = require('../../modules/core');
const rankingsSchema = require('./config/rankings.schema');
const db = core.connection;
const date = core.date;
const config = core.config;
const crypto = core.crypto;
const validator = core.validator;
const checkField = core.validator.validator;
const booksModel = require('./books.model').model;

/**
 * Validate ranking create
 * @param  {Object} book Ranking object
 * @return {Promise}      Resolve/Reject
 */
function validateRankingCreate(ranking){
  ranking._id_user = checkField.trim(checkField.escape(ranking._id_user));
  ranking.comment = checkField.trim(checkField.escape(ranking.comment));

  return validator.validateSchema(ranking, rankingsSchema.rankingsCreateSchema);
}

/**
 * Validate ranking update
 * @param  {Object} book Ranking object
 * @return {Promise}      Resolve/Reject
 */
function validateRankingUpdate(ranking){
  ranking._id_user = checkField.trim(checkField.escape(ranking._id_user));
  ranking.comment = checkField.trim(checkField.escape(ranking.comment));

  return validator.validateSchema(ranking, rankingsSchema.rankingsUpdateSchema);
}

/**
 * Insert ranking in DB
 * @param  {ObjectId} id Id which has to be updated
 * @param  {Object} ranking ranking object
 * @return {Promise}        Resolve/Reject
 */
function insert(id_book, ranking) {

  ranking.create_at = date.getDateUTC();
  ranking.modified_at = date.getDateUTC();

  let query = {
    _id: id_book
  };

  let data = {
    $push: {
      rankings: ranking
    }
  };

  let opt = {
    upsert: false,
    new: true,
    safe: true
  };

  return booksModel
    .findOneAndUpdate(query, data, opt)
    .exec();
}

/**
 * Update ranking in DB
 * @param  {ObjectId} id Id which has to be updated
 * @param  {Object} ranking ranking object
 * @return {Promise}        Resolve/Reject
 */
function update(id_book, ranking) {

  let query = {
    '_id': id_book,
    'rankings._id': ranking._id
  };

  let data = {
    '$set': {
      'rankings.$._id_user': ranking._id_user,
      'rankings.$.comment': ranking.comment,
      'rankings.$.stars': ranking.stars,
      'rankings.$.modified_at': date.getDateUTC()
    }
  };

  let opt = {
    upsert: false,
    new: true,
    safe: true
  };

  return booksModel
    .findOneAndUpdate(query, data, opt)
    .exec();
}

/**
 * Remove ranking in DB
 * @param  {ObjectId} id Id which has to be updated
 * @param  {Object} ranking ranking object
 * @return {Promise}        Resolve/Reject
 */
function remove(id_book, id) {
  let query = {
    _id: id_book
  };

  let data = {
    $pull: {
      rankings: {
        _id: id
      }
    }
  };

  let opt = {
    upsert: false,
    new: true,
    safe: true
  };

  return booksModel
    .findOneAndUpdate(query, data, opt)
    .exec();
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  validateRankingCreate: validateRankingCreate,
  validateRankingUpdate: validateRankingUpdate,
  insert: insert,
  update: update,
  remove: remove
};

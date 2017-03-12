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
const pricesSchema = require('./config/prices.schema');
const db = core.connection;
const date = core.date;
const config = core.config;
const crypto = core.crypto;
const validator = core.validator;
const checkField = core.validator.validator;
const booksModel = require('./books.model').model;

/**
 * Validate price create
 * @param  {Object} book Price object
 * @return {Promise}      Resolve/Reject
 */
function validatePriceCreate(price){
  return validator.validateSchema(price, pricesSchema.pricesCreateSchema);
}

/**
 * Validate price update
 * @param  {Object} book Price object
 * @return {Promise}      Resolve/Reject
 */
function validatePriceUpdate(price){
  return validator.validateSchema(price, pricesSchema.pricesUpdateSchema);
}

/**
 * Insert price in DB
 * @param  {ObjectId} id Id which has to be updated
 * @param  {Object} price price object
 * @return {Promise}        Resolve/Reject
 */
function insert(id_book, price) {

  price.create_at = date.getDateUTC();
  price.modified_at = date.getDateUTC();

  let query = {
    _id: id_book
  };

  let data = {
    $push: {
      prices: price
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
 * Update price in DB
 * @param  {ObjectId} id Id which has to be updated
 * @param  {Object} price price object
 * @return {Promise}        Resolve/Reject
 */
function update(id_book, price) {

  let query = {
    '_id': id_book,
    'prices._id': price._id
  };

  let data = {
    '$set': {
      'prices.$.price_min': price.price_min,
      'prices.$.price_sug': price.price_sug,
      'prices.$.date_begin': price.date_begin,
      'prices.$.date_end': price.date_end,
      'prices.$.type': price.type,
      'prices.$.modified_at': date.getDateUTC()
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
 * Remove price in DB
 * @param  {ObjectId} id Id which has to be updated
 * @param  {Object} price price object
 * @return {Promise}        Resolve/Reject
 */
function remove(id_book, id) {
  let query = {
    _id: id_book
  };

  let data = {
    $pull: {
      prices: {
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
  validatePriceCreate: validatePriceCreate,
  validatePriceUpdate: validatePriceUpdate,
  insert: insert,
  update: update,
  remove: remove
};

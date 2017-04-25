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
const date = core.date;
const validator = core.validator;
const booksModel = require('./books.model').model;

/**
 * Validate price create
 * @param  {Object} book Price object
 * @return {Promise}      Resolve/Reject
 */
function validateCreate(price){
  return validator.validateSchema(price, pricesSchema.pricesCreateSchema);
}

/**
 * Validate price update
 * @param  {Object} book Price object
 * @return {Promise}      Resolve/Reject
 */
function validateUpdate(price){
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
      'prices.$.type': price.type,
      'prices.$.active': price.active,
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
 * Check if type of price already exists
 * @param  {ObjectId} id_book book id
 * @param  {Number} type price type
 * @return {Promise}        Resolve/Reject
 */
function alreadyHasPrice(id_book, type) {

  let query = {
    '_id': id_book,
    'prices.type': type
  };

  return booksModel
    .findOne(query)
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
  validateCreate: validateCreate,
  validateUpdate: validateUpdate,
  alreadyHasPrice: alreadyHasPrice,
  insert: insert,
  update: update,
  remove: remove
};

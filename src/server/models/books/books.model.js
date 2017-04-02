/**
 * Created by jonathan on 04/03/17.
 */
'use strict';
/**
 * Model Books
 */

/**
 * Dependencies
 */
const core = require('../../modules/core');
const booksSchema = require('./config/books.schema');
const db = core.connection;
const date = core.date;
const config = core.config;
const validator = core.validator;
const checkField = core.validator.validator;
const booksModel = db.database.model('books', booksSchema.booksSchema);

/**
 * Insert book
 * @param  {Object} book Book object
 * @return {Promise}      Resolve/Reject
 */
function insert(book) {
  book.create_at = date.getDateUTC();
  book.modified_at = date.getDateUTC();
  return new booksModel(book).save();
}

/**
 * Update in DB
 * @param  {ObjectId} id Id which has to be updated
 * @param  {Object} book Book object
 * @return {Promise}        Resolve/Reject
 */
function update(id, book) {

  book.modified_at = date.getDateUTC();

  let query = {
    _id: id
  };

  let opt = {
    upsert: false,
    new: true
  };

  return booksModel
    .findOneAndUpdate(query, book, opt)
    .exec();
}

/**
 * Delete in DB
 * @param  {ObjectId} id Id which has to be deleted
 * @return {Promise}        Resolve/Reject
 */
function remove(id) {
  return booksModel.findByIdAndRemove(id)
    .exec();
}

/**
 * List all books
 * @param  {Number} page Page number
  * @return {Promise}      Resolve/Reject
 */
function list(page) {
  let pageSize = parseInt(config.getPageSize());
  return booksModel.paginate(
    {
      //  active: true
    },
    {
      page: page,
      limit: pageSize,
      sort: {
        'created_at': 'descending'
      }
    });
}

/**
 * List all books for store with user was write
 * @param  {Number} page Page number
 * @return {Promise}      Resolve/Reject
 */
function listStore(page) {
  let pageSize = parseInt(config.getPageSize());
  let next = (pageSize * (((page <= 1) ? 1 : page) -1));
  return booksModel.aggregate([
    {
      $match: {
        'visible': 1
      }
    },
    {
      $sort: {
        date_published: -1
      }
    },
    {
      $skip: parseInt((next < 0 ? 1 : next)) || 1
    },
    {
      $limit: pageSize
    },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: 'written_books._id_book',
        as: 'user'
      }
    },
    {
      $unwind: '$user'
    },
    {
      $project: {
        '_id': 1,
        'title': 1,
        'synopsis': 1,
        'percentage': 1,
        'esbn': 1,
        'date_published': 1,
        'language': 1,
        'average_star': 1,
        'cover_image': 1,
        'comments': 1,
        'keywords': 1,
        'rankings': 1,
        'prices': 1,
        'user._id': 1,
        'user.username': 1,
        'user.email': 1,
        'user.name': 1,
        'user.average_stars': 1,
        'user.reviews': 1,
        'user.followers': 1,
        'user.following': 1,
        'user.cover_image': 1
      }
    }
  ]).exec();
}

/**
 * List the record in the DB that has the specified ObjectId
 * @param  {ObjectId} id Id which has to be listed
 * @return {Promise} Resolve/Reject
 */
function findById(id) {
  return booksModel.findById(id)
    .exec();
}

/**
 * Get the actual price of the book
 * @param  {ObjectId} id Id of the book
 * @return {Promise} Resolve/Reject
 */
/*
function findPrice(id) {
  let query = {
    $and: [
      { _id: id },
      { $or: [ {'prices.date_begin': {$lt: date.getDateUTC()} }, {'prices.date_begin': date.getDateUTC()} ] },
      { $or: [ {'prices.date_end': {$gt: date.getDateUTC()} }, {$and: [{'prices.date_end': null}, {'prices.type': 0}] } ] }
    ]
  };

  let sort = {
    'prices.date_begin': -1
  };

  return booksModel
    .find(query)
    .sort(sort)
    .limit(1)
    .exec();
}
*/

function findPrice(id) {

  let query = {
    $and: [
      { _id: db.getObjectId(id) },
      { 'prices.date_begin': { $lte: date.getDateTimeNowMongo() } },
      { $or:
        [ {'prices.date_end': {$gte: date.getDateTimeNowMongo()} }, {$and: [{'prices.date_end': null}, {'prices.type': 0}] } ] }
    ]
  };

  let sort = {
    'prices.date_begin': -1
  };

  return booksModel.aggregate([
    {
      '$project': {
        'prices': {
          '_id': 1,
          'date_begin': 1,
          'date_end': 1,
          'price_min': 1,
          'price_sug': 1,
          'type': 1
        }
      }
    },
    {
      $unwind: '$prices'
    },
    {
      $match: query
    },
    {
      $sort: sort
    }
  ])
  .limit(1)
  .exec();
}

/**
 * Validate create
 * @param  {Object} book Book object
 * @return {Promise}      Resolve/Reject
 */
function validateCreate(book){
  book.title = checkField.trim(checkField.escape(book.title));
  book.synopsis = checkField.trim(checkField.escape(book.synopsis));
  book.content = checkField.trim(checkField.escape(book.content));
  book.esbn = checkField.trim(checkField.escape(book.esbn));
  book.language = checkField.trim(checkField.escape(book.language));

  return validator.validateSchema(book, booksSchema.booksCreateSchema);
}

/**
 * Validate update
 * @param  {Object} book Book object
 * @return {Promise}      Resolve/Reject
 */
function validateUpdate(book){
  book._id = checkField.trim(checkField.escape(book._id));
  book.title = checkField.trim(checkField.escape(book.title));
  book.synopsis = checkField.trim(checkField.escape(book.synopsis));
  book.content = checkField.trim(checkField.escape(book.content));
  book.esbn = checkField.trim(checkField.escape(book.esbn));
  book.language = checkField.trim(checkField.escape(book.language));

  return validator.validateSchema(book, booksSchema.booksUpdateSchema);
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  validateCreate: validateCreate,
  validateUpdate: validateUpdate,
  insert: insert,
  update: update,
  remove: remove,
  list: list,
  listStore: listStore,
  findById: findById,
  findPrice: findPrice,
  model: booksModel
};

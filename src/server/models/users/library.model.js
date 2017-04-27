/**
 * Created by jonathan on 26/04/17.
 */
'use strict';
/**
 * Model users
 */

/**
 * Dependencies
 */
const core = require('../../modules/core');
const usersModel = require('./users.model').model;
const librarySchema = require('./config/library.schema');
const db = core.connection;
const date = core.date;
const config = core.config;
const validator = core.validator;
const checkField = core.validator.validator;


/**
 * Insert in DB
 * @param  {ObjectId} id choice id
 * @param  {Object} choice choice object
 * @return {Promise}        Resolve/Reject
 */
function insert(id, book, isArray) {

  let query = {
    _id: db.getObjectId(id)
  };

  let data = {};

  if (isArray) {
    data = {
      $pushAll: {
        library: book
      }
    };
  }
  else {
    data = {
      $push: {
        library: {
          _id_book: book._id_book,
          favorite: book.favorite,
          date_saved: date.getDateUTC(),
          visible: book.visible
        }
      }
    };
  }


  let opt = {
    upsert: false,
    new: true,
    safe: true
  };

  return usersModel
    .findOneAndUpdate(query, data, opt)
    .exec();
}

/**
 * Update in DB
 * @param  {ObjectId} id choice id
 * @param  {Object} choice choice object
 * @return {Promise}        Resolve/Reject
 */
function update(id, book) {
  let query = {
    _id: id,
    'library._id': book._id
  };

  let data = {
    $set: {
      'library.$.favorite': book.favorite,
      'library.$.visible': book.visible
    }
  };

  let opt = {
    upsert: false,
    new: true,
    safe: true
  };

  return usersModel
    .findOneAndUpdate(query, data, opt)
    .exec();
}

/**
 * Delete in DB
 * @param  {Object} choice choice which has to be deleted
 * @return {Promise}        Resolve/Reject
 */
function remove(book) {
  let query = {
    _id: book._id
  };

  let data = {
    $pull: {
      library: {
        _id: book._id_book
      }
    }
  };

  let opt = {
    upsert: false,
    new: true,
    safe: true
  };

  return usersModel
    .findOneAndUpdate(query, data, opt)
    .exec();
}

/**
 * List all register in DB
 * @param  {Number} page number of page
 * @return {Promise} Resolve/Reject
 */
function list(page) {
  let pageSize = parseInt(config.getPageSize());

  return usersModel.paginate(
    {

    },
    {
      page: page,
      limit: pageSize,
      sort: {
        'create_at': 'descending'
      },
      select: {
        'library': 1
      }
    });
}

/**
 * List all register in DB
 * @param  {String} user username
 * @param  {Number} page number of page
 * @return {Promise} Resolve/Reject
 */
function listByUser(user, page) {
  let pageSize = parseInt(config.getPageSize());

  return usersModel.findOne({ username: user })
    .exec();
}

/**
 * List the record in the DB that has the specified ObjectId
 * @param  {ObjectId} choice choice which has to be listed
 * @return {Promise} Resolve/Reject
 */
function findById(book) {
  let query = {
    _id: book._id,
    'library._id': book._id_book
  };

  return usersModel.findOne(query)
    .select('library')
    .exec();
}

/**
 * Check if book already in library
 * @param  {ObjectId} idUser user id
 * @param  {ObjectId} idBook book id
 * @return {Promise}        Resolve/Reject
 */
function alreadyInLibrary(idUser, idBook) {
  let query = {
    _id: idUser,
    'library._id_book': idBook
  };

  return usersModel
    .findOne(query)
    .exec();
}

/**
 * Validate create
 * @param  {Object} choice choice object
 * @return {Promise}      Resolve/Reject
 */
function validateCreate(library) {
  library._id_book = checkField.trim(checkField.escape(library._id_book));
  library.date_saved = checkField.trim(checkField.escape(library.date_saved));
  library.favorite = checkField.trim(checkField.escape(library.favorite));
  library.visible = checkField.trim(checkField.escape(library.visible));

  return validator.validateSchema(library, librarySchema.libraryCreateSchema);
}


/**
 * Validate update
 * @param  {Object} choice choice object
 * @return {Promise}      Resolve/Reject
 */
function validateUpdate(library) {

  library._id = checkField.trim(checkField.escape(library._id));
  library._id_book = checkField.trim(checkField.escape(library._id_book));
  library.date_saved = checkField.trim(checkField.escape(library.date_saved));
  library.favorite = checkField.trim(checkField.escape(library.favorite));
  library.visible = checkField.trim(checkField.escape(library.visible));

  return validator.validateSchema(library, librarySchema.libraryUpdateSchema);
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
  listByUser: listByUser,
  findById: findById,
  alreadyInLibrary: alreadyInLibrary
};

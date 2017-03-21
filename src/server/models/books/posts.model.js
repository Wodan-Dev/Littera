/**
 * Created by César on 04/03/17.
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
const postsSchema = require('./config/posts.schema');
const db = core.connection;
const date = core.date;
const validator = core.validator;
const checkField = core.validator.validator;
const booksModel = db.database.model('books', booksSchema.booksSchema);

/**
 * Validate forum create
 * @param  {Object} book Forum object
 * @return {Promise}      Resolve/Reject
 */
function validatePostCreate(post){
  post._id_user = checkField.trim(checkField.escape(post._id_user));
  post.content = checkField.trim(checkField.escape(post.content));
  //post.spoiler = checkField.trim(checkField.escape(post.content));

  return validator.validateSchema(post, postsSchema.postsCreateSchema);
}

/**
 * Validate forum update
 * @param  {Object} book Forum object
 * @return {Promise}      Resolve/Reject
 */
function validatePostUpdate(post){
  post._id = checkField.trim(checkField.escape(post._id));
  post._id_user = checkField.trim(checkField.escape(post._id_user));
  post.content = checkField.trim(checkField.escape(post.content));
  //post.spoiler = checkField.trim(checkField.escape(post.content));

  return validator.validateSchema(post, postsSchema.postsUpdateSchema);
}

/**
 * List all register in DB
 * @return {Promise} Resolve/Reject
 */
function listByBook(id_book, page) {
  //let pageSize = parseInt(config.getPageSize());

  return booksModel.findById({_id: id_book})
    .populate('forums.posts._id_user', 'username email')
    .exec();
}

/**
 * Insert forum in DB
 * @param  {ObjectId} id Id which has to be updated
 * @param  {Object} sale forum object
 * @return {Promise}        Resolve/Reject
 */
function insert(id_book, id_forum, post) {

  post.create_at = date.getDateUTC();
  post.modified_at = date.getDateUTC();

  let query = {
    '_id': id_book,
    'forums._id': id_forum
  };

  let data = {
    $push: {
      'forums.$.posts': post
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
 * Update forum in DB
 * @param  {ObjectId} id Id which has to be updated
 * @param  {Object} forum forum object
 * @return {Promise}        Resolve/Reject
 */
function update(id_book, id_forum, post) {
  let query = {
    '_id': id_book,
    'forums._id': id_forum,
    'forums.posts._id': post._id
  };

  let data = {
    '$set': {
      'posts.$._id_user': post._id_user,
      'posts.$.content': post.content,
      'posts.$.spoiler': post.spoiler,
      'posts.$.modified_at': date.getDateUTC()
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
 * Remove forum in DB
 * @param  {ObjectId} id Id which has to be updated
 * @param  {Object} sale forum object
 * @return {Promise}        Resolve/Reject
 */
function remove(id_book, id_forum, id) {
  let query = {
    '_id': id_book,
    'forums._id': id_forum,
    'forums.posts._id': id
  };

  let data = {
    $pull: {
      forums: {
        posts: {
          _id: id
        }
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
  validatePostCreate: validatePostCreate,
  validatePostUpdate: validatePostUpdate,
  listByBook: listByBook,
  insert: insert,
  update: update,
  remove: remove
};

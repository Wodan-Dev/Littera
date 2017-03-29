/**
 * Created by jonathan on 29/03/17.
 */
'use strict';
/**
 * Model feed
 */

/**
 * Dependencies
 */
const core = require('../../modules/core');
const feedSchema = require('./config/feed.schema');
const db = core.connection;
const date = core.date;
const config = core.config;
const validator = core.validator;
const checkField = core.validator.validator;
const feedModel = db.database.model('feeds', feedSchema.feedSchema);

/**
 * Insert feed
 * @param  {Object} feed Book object
 * @return {Promise}      Resolve/Reject
 */
function insert(feed) {
  feed.create_at = date.getDateUTC();
  feed.modified_at = date.getDateUTC();
  return new feedModel(feed).save();
}

/**
 * Update in DB
 * @param  {ObjectId} id Id which has to be updated
 * @param  {Object} feed Book object
 * @return {Promise}        Resolve/Reject
 */
function update(id, feed) {

  feed.modified_at = date.getDateUTC();

  let query = {
    _id: id
  };

  let opt = {
    upsert: false,
    new: true
  };

  return feedModel
    .findOneAndUpdate(query, feed, opt)
    .exec();
}

/**
 * Delete in DB
 * @param  {ObjectId} id Id which has to be deleted
 * @return {Promise}        Resolve/Reject
 */
function remove(id) {
  return feedModel.findByIdAndRemove(id)
    .exec();
}

/**
 * List all feeds
 * @param  {Number} page Page number
 * @return {Promise}      Resolve/Reject
 */
function list(page) {
  let pageSize = parseInt(config.getPageSize());
  return feedModel.paginate(
    {
      //  active: true
    },
    {
      page: page,
      limit: pageSize,
      sort: {
        'created_at': 'descending'
      },
      populate: '_id_book _id_user'
    });
}

/**
 * List the record in the DB that has the specified ObjectId
 * @param  {ObjectId} id Id which has to be listed
 * @return {Promise} Resolve/Reject
 */
function findById(id) {
  return feedModel.findById(id)
    .exec();
}

/**
 * Validate create
 * @param  {Object} feed Book object
 * @return {Promise}      Resolve/Reject
 */
function validateCreate(feed){
  feed._id_user = checkField.trim(checkField.escape(feed._id_user));
  feed._id_book = checkField.trim(checkField.escape(feed._id_book));
  feed.type_feed = checkField.trim(checkField.escape(feed.type_feed));
  console.log('feed');
  console.log(feed);
  return validator.validateSchema(feed, feedSchema.feedCreateSchema);
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  validateCreate: validateCreate,
  insert: insert,
  update: update,
  remove: remove,
  list: list,
  findById: findById,
  model: feedModel
};

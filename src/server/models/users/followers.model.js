/**
 * Created by jonathan on 14/03/17.
 */
'use strict';
/**
 * Model followers
 */

/**
 * Dependencies
 */
const core = require('../../modules/core');
const usersModel = require('./users.model').model;
const followersSchema = require('./config/followers.schema');
const db = core.connection;
const date = core.date;
const config = core.config;
const validator = core.validator;
const checkField = core.validator.validator;


/**
 * Insert in DB
 * @param  {ObjectId} id choice id
 * @param  {Object} follower follower object
 * @return {Promise}        Resolve/Reject
 */
function insert(id, follower) {

  let query = {
    _id: db.getObjectId(id)
  };

  let data = {
    $push: {
      followers: {
        _id_user_follow: follower._id_user_follow,
        date_followed: date.getDateUTC()
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
 * Delete in DB
 * @param  {Object} follower follower which has to be deleted
 * @return {Promise}        Resolve/Reject
 */
function remove(follower) {
  let query = {
    _id: follower._id
  };

  let data = {
    $pull: {
      followers: {
        _id_user_follow: follower._id_follow
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
 * @param  {String} user username
 * @param  {Number} page number of page
 * @return {Promise} Resolve/Reject
 */
function listByUser(user, page) {
  let pageSize = parseInt(config.getPageSize());

  return usersModel.findOne({ username: user })
    .populate('followers._id_user_follow', 'username email')
    .exec();
}


/**
 * Update in DB
 * @param  {ObjectId} id choice id
 * @param  {Object} choice choice object
 * @return {Promise}        Resolve/Reject
 */
function alreadyFollowed(idUser, idFollow) {
  let query = {
    _id: idUser,
    'followers._id_user_follow': idFollow
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
function validateCreate(follower) {

  follower._id_user_follow = checkField.trim(checkField.escape(follower._id_user_follow));

  return validator.validateSchema(follower, followersSchema.followersCreateSchema);
}


/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  validateCreate: validateCreate,
  insert: insert,
  remove: remove,
  listByUser: listByUser,
  alreadyFollowed: alreadyFollowed
};

/**
 * Created by jonathan on 06/03/17.
 */
'use strict';
/**
 * Model reviews
 */

/**
 * Dependencies
 */
const core = require('../../modules/core');
const usersModel = require('./users.model').model;
const reviewsSchema = require('./config/reviews.schema');
const db = core.connection;
const date = core.date;
const config = core.config;
const crypto = core.crypto;
const validator = core.validator;
const checkField = core.validator.validator;


/**
 * Insert in DB
 * @param  {Object} review Enterprise object
 * @return {Promise}        Resolve/Reject
 */
function insert(review) {

  let query = {
    _id: review._id
  };

  let data = {
    $push: {
      reviews: {
        stars: review.stars,
        comment: review.comment,
        _id_user: review._id_user,
        create_at: date.getDateUTC(),
        modified_at: date.getDateUTC()
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
 * Update in DB
 * @param  {Object} user review object
 * @return {Promise}        Resolve/Reject
 */
function update(review) {
  let query = {
    _id: review._id,
    'reviews._id': review._idReview
  };

  let data = {
    $set: {
      'reviews.$.stars': review.stars,
      'reviews.$.modified_at': date.getDateUTC(),
      'reviews.$.comment': review.comment
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
 * @param  {Object} review review which has to be deleted
 * @return {Promise}        Resolve/Reject
 */
function remove(review) {
  let query = {
    _id: review._id
  };

  let data = {
    $pull: {
      reviews: {
        _id: review._idReview
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
        'reviews': 1
      }
    });
}

/**
 * List all register in DB
 * @return {Promise} Resolve/Reject
 */
function listByUser(user, page) {
  let pageSize = parseInt(config.getPageSize());
  console.log('usersModel');
  console.log(usersModel);
  return usersModel.paginate(
    {
      'reviews._id_user': user
    },
    {
      page: page,
      limit: pageSize,
      sort: {
        'create_at': 'descending'
      },
      select: {
        'reviews': 1
      }
    });
}

/**
 * List the record in the DB that has the specified ObjectId
 * @param  {ObjectId} id id which has to be listed
 * @return {Promise} Resolve/Reject
 */
function findById(review) {
  let query = {
    _id: review._id,
    'reviews._id': review._idReview
  };

  return usersModel.findOne(query)
    .select('reviews')
    .exec();
}

/**
 * Validate create
 * @param  {Object} review review object
 * @return {Promise}      Resolve/Reject
 */
function validateCreate(review) {

  review._id_user = checkField.trim(checkField.escape(review._id_user));
  review.stars = checkField.trim(checkField.escape(review.stars));
  review.comment = checkField.trim(checkField.escape(review.comment));

  return validator.validateSchema(review, reviewsSchema.reviewsCreateSchema);
}


/**
 * Validate update
 * @param  {Object} review review object
 * @return {Promise}      Resolve/Reject
 */
function validateUpdate(review) {

  review._id = checkField.trim(checkField.escape(review._id));
  review._id_user = checkField.trim(checkField.escape(review._id_user));
  review.stars = checkField.trim(checkField.escape(review.stars));
  review.comment = checkField.trim(checkField.escape(review.comment));

  return validator.validateSchema(review, reviewsSchema.reviewsUpdateSchema);
}

function validateId(id) {
  return new Promise(function (resolve, reject) {
    if (checkField.isMongoId(id)) {
      resolve(checkField.trim(id));
    }
    else {
      reject(validator.invalidResult(id, 'Id is invalid.'));
    }
  });
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  validateCreate: validateCreate,
  validateUpdate: validateUpdate,
  validateId: validateId,
  insert: insert,
  update: update,
  remove: remove,
  list: list,
  listByUser: listByUser,
  findById: findById
};




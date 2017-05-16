/**
 * Created by jonathan on 04/03/17.
 */
'use strict';
/**
 * Model users
 */

/**
 * Dependencies
 */
const core = require('../../modules/core');
const usersSchema = require('./config/users.schema');
const db = core.connection;
const date = core.date;
const config = core.config;
const crypto = core.crypto;
const validator = core.validator;
const checkField = core.validator.validator;
const usersModel = db.database.model('users', usersSchema.usersSchema);

/**
 * Insert in DB
 * @param  {Object} enterprise Enterprise object
 * @return {Promise}        Resolve/Reject
 */
function insert(user) {
  user.create_at = date.getDateUTC();
  user.modified_at = date.getDateUTC();
  return crypto.encrypt(user.password)
    .then(function (hash) {
      user.password = hash;
      return new usersModel(user)
        .save();
    });
}

/**
 * Update in DB
 * @param  {ObjectId} id id which has to be updated
 * @param  {Object} user User object
 * @return {Promise}        Resolve/Reject
 */
function update(id, user) {
  user.modified_at = date.getDateUTC();
  let query = {
    _id: id
  };

  let opt = {
    upsert: false,
    new: true
  };

  return usersModel
    .findOneAndUpdate(query, user, opt)
    .exec();
}

/**
 * Delete in DB
 * @param  {ObjectId} id id which has to be deleted
 * @return {Promise}        Resolve/Reject
 */
function remove(id) {
  return usersModel.findByIdAndRemove(id)
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
      //  active: true
    },
    {
      page: page,
      limit: pageSize,
      sort: {
        'create_at': 'descending'
      }
    });
}

/**
 * List the record in the DB that has the specified ObjectId
 * @param  {ObjectId} id id which has to be listed
 * @return {Promise} Resolve/Reject
 */
function findById(id) {
  return usersModel.findById(id)
    .exec();
}

/**
 * get user by username
 * @param  {ObjectId} username username which has to be loaded
 * @return {Promise}        Resolve/Reject
 */
function findByUserName(username, allInfo) {
  let model = usersModel.findOne({ username: username });

  if (allInfo) {
    model.populate('written_books._id_book')
      .populate('library._id_book')
      .populate('wishlist._id_book')
      .populate('following._id_user_follow')
      .populate('followers._id_user_follow')
      .populate('reviews._id_user');
  }


  return model.exec();
}

/**
 * get user by email
 * @param  {ObjectId} email email which has to be loaded
 * @return {Promise}        Resolve/Reject
 */
function findByUserEmail(email) {
  return usersModel.findOne({ email: email }).exec();
}

function updateAverageStars(id) {

  let query = {
    _id: db.getObjectId(id.toString())
  };

  let opt = {
    upsert: false,
    new: true
  };

  let averageStars = 0;

  return usersModel.aggregate([
    {
      $match:
      {
        _id: db.getObjectId(id.toString())
      }
    },
    {
      $unwind: {
        path: '$reviews',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group:
      {
        _id: '$_id',
        total: { $sum: '$reviews.stars' },
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        _id: '$_id',
        average_stars: {
          $divide: [ '$total', '$count' ]
        }

      }
    }
  ])
    .exec()
    .then(function (avg) {
      averageStars = avg[0].average_stars;
      return usersModel.findById(id).exec();
    })
    .then(function (user) {
      user.average_stars = parseFloat((averageStars > 5 ? 5 : averageStars).toFixed(1));

      return usersModel
        .findOneAndUpdate(query, user, opt)
        .exec();
    });
}

/**
 * Validate create
 * @param  {Object} user user object
 * @return {Promise}      Resolve/Reject
 */
function validateCreate(user) {

  user.username = checkField.trim(checkField.escape(user.username));
  user.email = checkField.trim(checkField.escape(user.email));
  user.password = checkField.trim(checkField.escape(user.password));
  user.passwordbis = checkField.trim(checkField.escape(user.passwordbis));

  return validator.validateSchema(user, usersSchema.newUsersCreateSchema);
}


/**
 * Validate create
 * @param  {Object} user user object
 * @return {Promise}      Resolve/Reject
 */
function validateUpdate(user) {

  user.name = checkField.trim(checkField.escape(user.name));
  user.gender = checkField.trim(checkField.escape(user.gender));
  user.dob = checkField.trim(checkField.escape(user.dob));
  user.cover_image = checkField.trim(user.cover_image);
  user.average_stars = checkField.trim(checkField.escape(user.average_stars));
  user.acepted_terms = checkField.trim(checkField.escape(user.acepted_terms));
  user.payment = checkField.trim(user.payment);

  return validator.validateSchema(user, usersSchema.usersUpdateSchema);
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
  findById: findById,
  findByUserName: findByUserName,
  findByUserEmail: findByUserEmail,
  updateAverageStars: updateAverageStars,
  model: usersModel
};

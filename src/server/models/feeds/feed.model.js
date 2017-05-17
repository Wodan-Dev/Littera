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
const usersModel = require('../users/users.model').model;
const db = core.connection;
const date = core.date;
const config = core.config;
const validator = core.validator;
const checkField = core.validator.validator;

function listFeed(username, page) {
  let pageSize = parseInt(config.getPageSize());
  let next = (pageSize * (((page <= 1) ? 1 : page) -1));
  return usersModel.aggregate([
    {
      $match: {
        username: username
      }
    },
    {
      $unwind: {
        path: '$following'
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'following._id_user_follow',
        foreignField: '_id',
        as: 'userFollow'
      }
    },
    {
      $unwind: {
        path: '$userFollow'
      }
    },
    {
      $project: {
        '_id': 1,
        'name': 1,
        'username': 1,
        'email': 1,
        'userFollow': {
          '_id': '$userFollow._id',
          'cover_image': '$userFollow.cover_image',
          'name': '$userFollow.name',
          'username': '$userFollow.username',
          'email': '$userFollow.email',
          'written_books': '$userFollow.written_books'
        }
      }
    },
    {
      $unwind: {
        path: '$userFollow.written_books'
      }
    },
    {
      $lookup: {
        from: 'books',
        localField: 'userFollow.written_books._id_book',
        foreignField: '_id',
        as: 'book'
      }
    },
    {
      $unwind: {
        path: '$book'
      }
    },
    {
      $match: {
        'book.visible': {
          $in: [
            1,
            0
          ]
        }
      }
    },
    {
      $sort: {
        'book.date_published': -1
      }
    },
    {
      $project: {
        _id_book: '$book',
        _id_user: '$userFollow',
        create_at: '$book.create_at',
        modified_at: '$book.modified_at'
      }
    },
    {
      $skip:  (parseInt((next < 0 ? 1 : next)) || 1) -1
    },
    {
      $limit: pageSize
    }
  ])
  .exec();
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  listFeed: listFeed
};

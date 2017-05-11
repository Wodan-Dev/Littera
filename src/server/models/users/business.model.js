/**
 * Created by jonathan on 07/05/17.
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
const salesModel = require('../sales/sales.model').model;
const db = core.connection;
const date = core.date;
const config = core.config;
const validator = core.validator;
const checkField = core.validator.validator;


/**
 * get count sales by book
 * @param  {ObjectId} userId id User
 * @return {Promise} Resolve/Reject
 */
function getSalesPerformance(userId) {

  return usersModel.aggregate([
    {
      $match: {
        '_id' : db.getObjectId(userId)
      }
    },
    {
      $unwind: {
        path: '$written_books',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: 'sales',
        localField: 'written_books._id_book',
        foreignField: 'items._id_book',
        as: 'sale'
      }
    },
    {
      $unwind: {
        path: '$sale',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $unwind: {
        path: '$sale.items'
      }
    },
    {
      $group:
      {
        _id: '$written_books._id_book',
        count: { $sum: 1 }
      }
    },
    {
      $lookup: {
        from: 'books',
        localField: '_id',
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
      $project: {
        '_id': '$_id',
        'title': '$book.title',
        'date_published': '$book.date_published',
        'cover_image':'$book.cover_image',
        'count': '$count'
      }
    }
  ])
    .exec();
}

function getBooksValue(userId) {
  return salesModel.aggregate([
    {
      $match: {
        'status': 2
      }
    },
    {
      $unwind: {
        path: '$items'
      }
    },
    {
      $project: {
        '_id': '$items._id_book',
        'value': '$items.value'
      }
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
      $unwind: {
        path: '$user'
      }
    },
    {
      $match: {
        'user._id' :  db.getObjectId(userId)
      }
    },
    {
      $group:
      {
        _id: '$_id',
        max_value: { $max: '$value' },
        min_value: { $min: '$value' },
        total: { $sum: '$value' },
        count: {$sum: 1}
      }
    },
    {
      $lookup: {
        from: 'books',
        localField: '_id',
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
      $project: {
        '_id': 1,
        'max_value': 1,
        'min_value': 1,
        'total': 1,
        'count': 1,
        'title': '$book.title',
        'subtitle': '$book.subtitle',
        'average_star': '$book.average_star'
      }
    }
  ])
    .exec();
}



/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  getSalesPerformance: getSalesPerformance,
  getBooksValue: getBooksValue
};

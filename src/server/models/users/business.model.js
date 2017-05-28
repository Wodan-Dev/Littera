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

function getBooksSalesByMonth(userId, bookId) {
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
      $match: {
        'items._id_book': db.getObjectId(bookId)
      }
    },
    {
      $project: {
        '_id': '$items._id_book',
        'month_year': {
          '$concat': [
            { '$substr': [ '$create_at', 5, 2 ] },
            '/',
            { '$substr': [ '$create_at', 0, 4 ] },

          ]
        }
      }
    },
    {
      $group:
      {
        _id: { month_year: '$month_year', '_id_book': '$_id' },
        count: {
          $sum: 1
        }
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: '_id._id_book',
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
        'user._id': db.getObjectId(userId)
      }
    },
    {
      $lookup: {
        from: 'books',
        localField: '_id._id_book',
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
        '_id': '$_id.month_year',
        'count': 1,
        '_id_book': '$_id._id_book',
        'title': '$book.title',
        'subtitle': '$book.subtitle',
        'average_star': '$book.average_star'
      }
    }
  ])
    .exec();
}

function getBooksTotalByMonth(userId) {
  return salesModel.aggregate([
    {
      $match: {
        status: 2
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
        'value': '$items.value',
        'month_year': {
          '$concat': [
            { '$substr': [ '$create_at', 5, 2 ] },
            '/',
            { '$substr': [ '$create_at', 0, 4 ] }
          ]
        }
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
        'user._id': db.getObjectId(userId)
      }
    },
    {
      $group:
      {
        _id: '$month_year',
        total: {
          $sum: '$value'
        }
      }
    }
  ])
    .exec();
}

function getTopUserSales(count) {
  return salesModel.aggregate([
    {
      $match: {
        status: 2
      }
    },
    {
      $unwind: {
        path: '$items'
      }

    },
    {
      $lookup: {
        from: 'users',
        foreignField: 'written_books._id_book',
        localField: 'items._id_book',
        as: 'user'
      }
    },
    {
      $unwind: {
        path: '$user'
      }
    },
    {
      $group: {
        _id: {
          _id: '$user._id',
          name: '$user.name',
          username: '$user.username',
          email: '$user.email',
          cover_image: '$user.cover_image'
        },
        count: {
          $sum: 1
        }
      }
    },
    {
      $sort: {
        count: -1
      }
    },
    {
      $project: {
        _id: '$_id._id',
        name: '$_id.name',
        username: '$_id.username',
        cover_image: '$_id.cover_image',
        count: '$count'

      }
    },
    {
      $limit: count
    }
  ])
    .exec();
}

function getTopBooksSales(count) {
  return salesModel.aggregate([
    {
      $match: {
        status: 2
      }
    },
    {
      $unwind: {
        path:'$items'
      }

    },
    {
      $group: {
        _id: '$items._id_book',
        count: {
          $sum: 1
        }
      }
    },
    {
      $sort: {
        count: -1
      }
    },
    {
      $limit: count
    },
    {
      $lookup: {
        from: 'books',
        foreignField: '_id',
        localField: '_id',
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
        '_id': '$book._id',
        'title': '$book.title',
        'subtitle': '$book.subtitle',
        'cover_image': '$book.cover_image',
        'count': '$book.count',
        'synopsis': '$book.synopsis',
        'percentage': '$book.percentage',
        'esbn': '$book.esbn',
        'esbn_13': '$book.esbn_13',
        'date_published': '$book.date_published',
        'language': '$book.language',
        'average_star': '$book.average_star',
        'comments': '$book.comments',
        'keywords': '$book.keywords',
        'rankings': '$book.rankings',
        'prices': '$book.prices'
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
  getBooksValue: getBooksValue,
  getBooksSalesByMonth: getBooksSalesByMonth,
  getTopUserSales: getTopUserSales,
  getTopBooksSales: getTopBooksSales,
  getBooksTotalByMonth: getBooksTotalByMonth
};

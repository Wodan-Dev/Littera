/**
 * Created by jonathan on 05/03/17.
 */
'use strict';
/**
 * Model sales
 */

/**
 * Dependencies
 */
const core = require('../../modules/core');
const salesSchema = require('./config/sales.schema');
const itemsSchema = require('./config/items.schema');
const db = core.connection;
const config = core.config;
const validator = core.validator;
const checkField = core.validator.validator;
const salesModel = db.database.model('sales', salesSchema.salesSchema);

/**
 * Insert sale
 * @param  {Object} sale sale object
 * @return {Promise}      Resolve/Reject
 */
function insert(sale) {
  return new salesModel(sale).save();
}

/**
 * Update in DB
 * @param  {ObjectId} id Id which has to be updated
 * @param  {Object} sale Sale object
 * @return {Promise}        Resolve/Reject
 */
function update(id, sale) {
  let query = {
    _id: id
  };

  let opt = {
    upsert: false,
    new: true
  };

  return salesModel
    .findOneAndUpdate(query, sale, opt)
    .exec();
}

/**
 * Remove item from sale
 * @param  {Object} saleItem Sale object
 * @return {Promise}        Resolve/Reject
 */
function updateItem(saleItem) {
  let query = {
    _id: saleItem._id,
    'items._id': saleItem._idItem
  };

  let data = {
    $set: {
      'items.$.value': saleItem.value
    }
  };

  let opt = {
    upsert: false,
    new: true,
    safe: true
  };

  return salesModel
    .findOneAndUpdate(query, data, opt)
    .exec();
}

/**
 * Update in DB
 * @param  {ObjectId} id Id which has to be updated
 * @param  {Object} sale Sale object
 * @return {Promise}        Resolve/Reject
 */
function insertItem(id, sale) {
  let query = {
    _id: id
  };

  let data = {
    $push: {
      items: sale
    }
  };

  let opt = {
    upsert: false,
    new: true,
    safe: true
  };

  return salesModel
    .findOneAndUpdate(query, data, opt)
    .exec();
}


/**
 * Delete in DB
 * @param  {ObjectId} id Id which has to be deleted
 * @return {Promise}        Resolve/Reject
 */
function remove(id) {
  return salesModel.findByIdAndRemove(id)
    .exec();
}


/**
 * Remove item from sale
 * @param  {Object} saleItem Sale Item object
 * @return {Promise}        Resolve/Reject
 */
function removeItem(saleItem) {
  let query = {
    _id: saleItem._id
  };

  let data = {
    $pull: {
      items: {
        _id: saleItem._idItem
      }
    }
  };

  let opt = {
    upsert: false,
    new: true,
    safe: true
  };

  return salesModel
    .findOneAndUpdate(query, data, opt)
    .exec();
}

/**
 * List all sales
 * @param  {Number} page Page number
 * @return {Promise}      Resolve/Reject
 */
function list(page) {
  let pageSize = parseInt(config.getPageSize());
  return salesModel.paginate(
    {

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
 * @param  {ObjectId} id Id which has to be listed
 * @return {Promise} Resolve/Reject
 */
function findById(id) {
  return salesModel.findById(id)
    .exec();
}

/**
 * List all sales of user id
 * @param  {ObjectId} id Id which has to be listed
 * @param  {Number} page page number
 * @return {Promise} Resolve/Reject
 */
function findByUserId(id, page) {
  let pageSize = parseInt(config.getPageSize());
  return salesModel.paginate(
    {
      _id_user: id
    },
    {
      page: page,
      limit: pageSize,
      sort: {
        'create_at': 'descending'
      },
      populate: 'items._id_book'
    });
}

/**
 * Return sale in status 0
 * @param  {ObjectId} id Id which has to be listed
 * @return {Promise} Resolve/Reject
 */
function getLastSale(idUser) {
  return salesModel.find({
    $and: [
      { _id_user: idUser },
      { status: 0 }
    ]
  })
    .populate('items._id_book')
    .limit(1)
    .exec();
}

/**
 * Check if book already in basket
 * @param  {ObjectId} idSale sale id
 * @param  {ObjectId} idBook book id
 * @return {Promise}        Resolve/Reject
 */
function alreadyInBasket(idSale, idBook) {
  let query = {
    _id: idSale,
    'items._id_book': idBook
  };

  return salesModel
    .findOne(query)
    .exec();
}


/**
 * Validate create
 * @param  {Object} sale Sale object
 * @return {Promise}      Resolve/Reject
 */
function validateCreate(sale){
  sale._id_user = checkField.trim(checkField.escape(sale._id_user));
  sale.transaction_id = checkField.trim(checkField.escape(sale.transaction_id));
  sale.status = checkField.trim(checkField.escape(sale.status));

  return validator.validateSchema(sale, salesSchema.salesCreateSchema);
}

/**
 * Validate create
 * @param  {Object} saleItem Sale item object
 * @return {Promise}      Resolve/Reject
 */
function validateItemCreate(saleItem){
  saleItem._id_book = checkField.trim(checkField.escape(saleItem._id_book));
  saleItem.value = checkField.trim(checkField.escape(saleItem.value));

  return validator.validateSchema(saleItem, itemsSchema.itemsCreateSchema);
}


/**
 * Validate ID
 * @param  {Object} id Id which has to be validated
 * @return {Promise}    Resolve/Reject
 */
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
 * Return a sale object for paypal api call
 * @param  {Object} id Id which has to be validated
 * @return {Promise}    Resolve/Reject
 */
function getSale(id) {
  let query = {
    _id: db.getObjectId(id)
  };

  return salesModel.aggregate([
    {
      $match: { _id: new db.getObjectId(id)}
    },
    {
      $unwind: {
        path: '$items',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $lookup: {
        from: 'books',
        localField: 'items._id_book',
        foreignField: '_id',
        as: 'book'
      }
    },
    {
      $unwind: '$book'
    },
    {
      $group:
      {
        _id: '$_id',
        totalsale: {
          $sum: '$items.value'
        },
        items: {
          $push: {
            _id: '$items._id',
            value: '$items.value',
            _id_book: '$items._id_book',
            title: '$book.title',
            synopsis: '$book.synopsis'
          }
        }
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
  validateCreate: validateCreate,
  validateItemCreate: validateItemCreate,
  validateId: validateId,
  insert: insert,
  insertItem: insertItem,
  update: update,
  updateItem: updateItem,
  remove: remove,
  removeItem: removeItem,
  list: list,
  findById: findById,
  findByUserId: findByUserId,
  getLastSale: getLastSale,
  getSale: getSale,
  alreadyInBasket: alreadyInBasket,
  model: salesModel
};

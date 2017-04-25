/**
 * Created by jonathan on 05/03/17.
 */
'use strict';
/**
 * Module Sales
 */

/**
 * Dependencies
 */
const core = require('../../../modules/core');
const uid = require('uid-safe').sync;
const salesModel = require('../../../models/sales/sales.model');
const validator = core.validator;

/**
 * Generate unique identifier to sale
 * @param {Object} sale Sale
 * @returns {Promise} Resolve/Reject
 */
function generateTransactionId(sale) {
  return new Promise(function (resolve) {

    let key = uid(24);
    sale.transaction_id= key;
    resolve(sale);
  });
}

function validateBook(idSale, idBook) {
  return new Promise(function (resolve, reject) {
    salesModel.alreadyInBasket(idSale, idBook)
      .then(function (item) {
        if (item)
          throw 'Livro já adicionado.';

        resolve(idSale);
      })
      .catch(function (err) {
        reject(validator.invalidResult(idBook, err));
      });
  });
}


/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  generateTransactionId: generateTransactionId,
  validateBook: validateBook
};

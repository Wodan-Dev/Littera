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
const uid = require('uid-safe').sync;

/**
 * Genrate unique identifier to sale
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



/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  generateTransactionId: generateTransactionId
};

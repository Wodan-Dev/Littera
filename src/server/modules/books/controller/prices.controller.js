/**
 * Created by jonathan on 24/04/17.
 */
'use strict';
/**
 * Module prices
 */

/**
 * Dependencies
 */
const core = require('../../../modules/core');
const pricesModel = require('../../../models/books/prices.model');
const validator = core.validator;


function validatePrice(idBook, type) {
  return new Promise(function (resolve, reject) {
    pricesModel.alreadyHasPrice(idBook, type)
      .then(function (item) {
        if (item)
          throw 'Tipo do preço já cadastrado.';

        resolve(idBook);
      })
      .catch(function (err) {
        reject(validator.invalidResult('price', err));
      });
  });
}


/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  validatePrice: validatePrice
};

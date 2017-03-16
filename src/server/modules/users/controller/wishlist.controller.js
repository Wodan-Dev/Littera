/**
 * Created by jonathan on 16/03/17.
 */
'use strict';
/**
 * Module users
 */

/**
 * Dependencies
 */
const core = require('../../core');
const wishListModel = require('../../../models/users/wishlist.model');
const validator = core.validator;

/**
 * validate if user can wish the book
 * @param {ObjectId} idUser id user
 * @param {ObjectId} idBook id book wish
 * @returns {Promise} Resolve/Reject
 */
function validateWish(idUser, idBook) {
  return new Promise(function (resolve, reject) {
    wishListModel.alreadyWished(idUser, idBook)
      .then(function (user) {
        if (user)
          throw 'Livro já desejado.';

        resolve(idUser);
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
  validateWish: validateWish
};

/**
 * Created by jonathan on 29/03/17.
 */
'use strict';
/**
 * Module users
 */

/**
 * Dependencies
 */
const core = require('../../core');
const writtenBooksModel = require('../../../models/users/written_books.model');
const validator = core.validator;

/**
 * validate if user can write the book
 * @param {ObjectId} idUser id user
 * @param {ObjectId} idBook id book wish
 * @returns {Promise} Resolve/Reject
 */
function validateWrite(idUser, idBook) {
  return new Promise(function (resolve, reject) {
    writtenBooksModel.alreadyWritten(idUser, idBook)
      .then(function (user) {
        if (user)
          throw 'Livro já escrito.';

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
  validateWrite: validateWrite
};


/**
 * Created by jonathan on 15/03/17.
 */
'use strict';
/**
 * Module users
 */

/**
 * Dependencies
 */
const core = require('../../core');
const followingModel = require('../../../models/users/following.model');
const validator = core.validator;

/**
 * validate if user can follow
 * @param {ObjectId} idUser id user to be follow
 * @param {ObjectId} idFollow id user follow
 * @returns {Promise} Resolve/Reject
 */
function validateFollower(idUser, idFollow) {
  return new Promise(function (resolve, reject) {
    followingModel.alreadyFollowed(idUser, idFollow)
      .then(function (user) {
        if (user)
          throw 'Usuário já seguido.';

        if (idUser.toString() === idFollow.toString())
          throw 'Não permitido';

        resolve(idUser);
      })
      .catch(function (err) {
        reject(validator.invalidResult(idFollow, err));
      });
  });

}

/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  validateFollower: validateFollower
};

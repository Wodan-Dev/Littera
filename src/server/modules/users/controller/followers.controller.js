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
const followersModel = require('../../../models/users/followers.model');
const validator = core.validator;

function validateFollower(idUser, idFollow) {
  return new Promise(function (resolve, reject) {
    followersModel.alreadyFollowed(idUser, idFollow)
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

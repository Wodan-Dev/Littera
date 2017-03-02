/**
 * Created by jonathan on 28/02/17.
 */
'use strict';
/**
 * Module authentication.controller
 */

/**
 * Dependencies
 */
const core = require('../../core');
const validator = core.validator;
const crypto = core.crypto;
const userModel = require('../model/users.model');

/**
 * load user data
 * @param  {Object} user user object
 * @return {Promise}      Resolve/Reject
 */
function loadUser(user) {
  return new Promise(function (resolve, reject) {
    let value = user.email;
    let prot = userModel.findByUserEmail;
    if (user.username) {
      prot = userModel.findByUserName;
      value = user.username;
    }

    prot(value)
      .then(function (ruser) {
        resolve(validator.validResult(ruser));
      })
      .catch(function (err) {
        reject(validator.invalidResult('load', err));
      });
  });
}


function validatePassword(user, pass) {
  return new Promise(function (resolve, reject) {
    crypto.compare(pass, user.password)
      .then(function (passok) {
        if (!passok)
          throw new Error();
        resolve(validator.validResult(user));
      })
      .catch(function () {
        reject(validator.invalidResult('password', 'Senha informada não é válida.'));
      });
  });
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  loadUser: loadUser,
  validatePassword: validatePassword
};

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
const checkField = validator.validator;
const userModel = require('../../../models/users/users.model');

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
        if (!ruser)
          throw new Error('Usuário não encontrado.');

        resolve(validator.validResult(ruser));
      })
      .catch(function () {
        reject(validator.invalidResult('username', 'Usuário não encontrado.'));
      });
  });
}

/**
 * Compare password in db
 * @param {Object} user User to check
 * @param {String} pass Password
 * @returns {Promise} Resolve/Reject
 */
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
 * Validate user
 * @param  {Object} user user object
 * @return {Promise}      Resolve/Reject
 */
function validateUser(user) {
  return new Promise(function (resolve, reject) {
    user.username = checkField.trim(checkField.escape(user.username));
    user.email = checkField.trim(checkField.escape(user.email));
    user.password = checkField.trim(checkField.escape(user.password));
    let lstErrors = [];

    if (checkField.isEmpty(user.username) && checkField.isEmpty(user.email)) {
      lstErrors.push(validator.createErrItem('username', 'Usuário/E-mail deve ser informado.'));
      //lstErrors.push(validator.createErrItem('email', 'valor nulo não permitido.'));
    }

    if (!checkField.isEmpty(user.email) &&
      !checkField.isEmail(user.email)) {
      lstErrors.push(validator.createErrItem('email', 'Senha deve ser informada.'));
    }

    if (checkField.isEmpty(user.password))
      lstErrors.push(validator.createErrItem('password', 'valor nulo não permitido.'));

    if (lstErrors.length)
      reject(validator.invalidResult('login', lstErrors));
    else
      resolve(validator.validResult(user));
  });
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  loadUser: loadUser,
  validatePassword: validatePassword,
  validateUser: validateUser
};

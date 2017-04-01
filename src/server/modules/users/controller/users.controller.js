'use strict';
/**
 * Module authentication
 */

/**
 * Dependencies
 */
const core = require('../../core');
const usersModel = require('../../../models/users/users.model');
const validator = core.validator;

/**
 * validate if password and passwordbis are equal
 * @param  {Object} user user object
 * @return {Promise}      Resolve/Reject
 */
function validatePassword(user) {
  return new Promise(function (resolve, reject) {

    if (user.password === user.passwordbis)
      resolve(user);
    else {
      let lstErrors = [];
      lstErrors.push(validator.createErrItem('password', 'Senhas devem ser iguais'));
      lstErrors.push(validator.createErrItem('passwordbis', 'Senhas devem ser iguais'));

      reject(validator.invalidResult(user, lstErrors));
    }

  });
}

/**
 * validate if user is valid
 * @param  {Object} user user object
 * @return {Promise}      Resolve/Reject
 */
function validateUserName(user) {
  return new Promise(function (resolve, reject) {
    usersModel.findByUserName(user.username)
      .then(function (rUser) {
        if (!rUser)
          resolve(user);
        else
          reject(validator.invalidResult('username', 'Usuário já cadastrado.'));
      })
      .catch(function () {
        resolve(user);
      });

  });
}


/**
 * validate if email is valid
 * @param  {Object} user user object
 * @return {Promise}      Resolve/Reject
 */
function validateEmail(user) {
  return new Promise(function (resolve, reject) {
    usersModel.findByUserEmail(user.email)
      .then(function (rUser) {
        if (!rUser)
          resolve(user);
        else
          reject(validator.invalidResult('email', 'E-mail já cadastrado.'));
      })
      .catch(function () {
        resolve(user);
      });

  });
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  validatePassword: validatePassword,
  validateUserName: validateUserName,
  validateEmail: validateEmail
};

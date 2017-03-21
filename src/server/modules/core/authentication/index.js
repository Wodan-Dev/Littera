/**
 * Created by jonathan on 27/02/17.
 */
'use strict';
/**
 * Module Authentication
 */

/**
 * Dependencies
 */
const certificates = require('../certificates');
const validator = require('../validator');
const redisdb = require('../redisdb');
const http = require('../http');
const render = http.render;
const date = require('../date');
const jwt = require('jsonwebtoken');
const uid = require('uid-safe').sync;

/**
 * Return token from request
 * @param {Request} req request
 * @returns {String} token string
 */
function getReqToken(req) {
  return req.headers['x-access-token'] || req.body.token || req.params.token || req.query.token;
}

/**
 * Return token validation
 * @param {String} token token
 * @returns {Promise} Resolve/Reject
 */
function validateToken(token, pcert ) {
  return new Promise(function (resolve, reject) {
    jwt.verify(token, pcert, { algorithms: ['RS256'] }, function (err, decoded) {
      if (err) {
        let errmsg = validator.createErrItem('token', 'Invalid Token');
        reject(validator.invalidResult('token', errmsg));
      }
      else
        resolve(decoded);
    });
  });
}

/**
 * Generate Token
 * @param {String} pValue value
 * @param {String} certificate private certificate value
 * @returns {Promise} Resolve/Reject
 */
function generateToken(pValue, pcert) {
  return new Promise(function (resolve, reject) {
    var options = {
      algorithm: 'RS256'
    };

    jwt.sign(
      pValue,
      pcert,
      options,
      function(err, result) {
        if(err) {
          reject(validator.invalidResult('auth', err.message));
        }
        else
          resolve(result);
      });
  });
}

/**
 * check session is valid
 * @param {Object} decoded token value
 * @returns {Promise} Resolve/Reject
 */
function validateSession(decoded) {
  return new Promise(function (resolve, reject) {
    redisdb.getValue('auth:' + decoded.sessionId)
      .then(function (value) {
        resolve({
          value: JSON.parse(value),
          decoded: decoded
        });
      })
      .catch(function () {
        reject({
          err: 'Sessão do usuário expirou.',
          status: http.HTTP_STATUS.HTTP_401_UNAUTHORIZED
        });
      });
  });
}

/**
 * Ensures the user is logged
 * @param {Object} req request object
 * @param {Object} res response object
 * @param {Function} next the next operation
 */
function ensureAuthenticated(req, res, next) {
  let token = getReqToken(req);
  if (token) {
    certificates.getPublic()
      .then(function (cert) {
        return validateToken(token, cert);
      })
      .then(validateSession)
      .then(function (session) {
        req.decoded = session.value;
        return next();
      })
      .catch(function (err) {
        render(res, err.err , http.HTTP_STATUS.HTTP_401_UNAUTHORIZED);
      });
  }
  else {
    render(res, { 'err': 'No token' }, http.HTTP_STATUS.HTTP_401_UNAUTHORIZED);
  }
}

/**
 * Generate auth session
 * @param {Object} user user to auth
 * @returns {Promise} Resolve/Reject
 */
function authenticate(user) {
  return new Promise(function (resolve, reject) {
    var sessionId = uid(24);

    var tokenValue = {
      _id: process.pid,
      sessionId: sessionId,
      date: date.getDateUTC()
    };

    certificates.getPrivate()
      .then(function (certificate) {
        return generateToken(tokenValue, certificate);
      })
      .then(function (token) {
        redisdb.setValue('auth:' + sessionId, JSON.stringify(user));

        resolve(token);
      })
      .catch(function (err) {
        reject(validator.invalidResult('auth', err.err));
      });
  });
}

/**
 * Returns the logged user
 * @param {Object} req request object
 * @returns {Promise} Resolve/Reject
 */
function getUserSession(req) {
  let token = getReqToken(req);
  return certificates.getPublic()
    .then(function (cert) {
      return validateToken(token, cert);
    })
    .then(function (result) {
      return validateSession(result);
    });
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  getReqToken: getReqToken,
  validateToken: validateToken,
  authenticate: authenticate,
  ensureAuthenticated: ensureAuthenticated,
  getUserSession: getUserSession
};


'use strict';
/**
 * Module certificates
 */

/**
 * Dependencies
 */
const fs = require('fs');

/**
 * Return root path
 * @return {String} path to the root
 */
function getRoot() {
  let path = require('path');
  return path.resolve(path.join(path.dirname(__dirname)), '../../../../');
}

/**
 * Return content of public certificate
 * @return {Promise} Resolve/Reject
 */
function getPublic() {
  return new Promise(function (resolve, reject) {
    fs.readFile(getRoot() + '/certificate/ssl/pukey.pub', function (err, cert) {
      if (err)
        reject({'err': 'certificado não encontrado.'});
      else
        resolve(cert);
    });
  });
}

/**
 * Return content of private certificate
 * @return {Promise} Resolve/Reject
 */
function getPrivate() {
  return new Promise(function (resolve, reject) {
    fs.readFile(getRoot() + '/certificate/ssl/prkey.pem', function (err, cert) {
      if (err)
        reject({ 'err': 'certificado não encontrado.' });
      else
        resolve(cert);
    });
  });
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  getPrivate: getPrivate,
  getPublic: getPublic
};

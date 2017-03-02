'use strict';
/**
 * Module crypto
 */

/**
 * Dependencies
 */
const crypto = require('md5');
const bcrypt = require('bcrypt');
const saltRounds = 14;

/**
 * Encrypt string
 * @param  {String} input string which had to be encrypted
 * @return {Promise}       Resolve/Reject
 */
function encrypt(input) {
  return bcrypt.hash(input, saltRounds);

}

/**
 * Compare string with hash
 * @param  {String} input string which had to be compared
 * @param  {String} hash  Hash
 * @return {Promise}       Resolve/Reject
 */
function compare(input, hash) {
  return bcrypt.compare(input, hash);
}

/**
 * generate md5
 * @param  {String} input string which had to be hash
 * @return {String}       Hash
 */
function generateMd5(input) {
  return crypto(input, 'utf-8');
}

/**
 * checks if md5 is equal
 * @param  {String} input string which had to be compared
 * @param  {String} input hash
 * @return {Boolean}       Result true/false
 */
function compareMd5(input, hash) {
  let hashed = generateMd5(input);

  return hashed === hash;
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  encrypt: encrypt,
  compare: compare,
  compareMd5: compareMd5,
  generateMd5: generateMd5
};

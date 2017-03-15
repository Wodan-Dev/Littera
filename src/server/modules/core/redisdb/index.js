/**
 * Created by jonathan on 27/02/17.
 */
'use strict';
/**
 * Module redisdb
 */

/**
 * Dependencies
 */
const config = require('../config');
const redis = require('redis');
const client = redis.createClient({
  host: config.getRedisHost(),
  port: config.getRedisPort(),
  ttl: 86400
});

/**
 * Return value from key in redis
 * @param {String} pkey key in redis
 * @returns {Promise} Resolve/Reject
 */
function getValue(pkey) {
  return new Promise(function (resolve, reject) {
    client.get(pkey, function (err, reply) {
      if (err)
        reject({ 'err': err.message });
      else if (!reply)
        reject({ 'err': 'Chave não encontrada.' });
      else
        resolve(reply);
    });
  });
}

/**
 * Change Expiration time of key
 * @param {String} pkey Key value
 * @param {Number} pexp Time in milliseconds
 */
function setExpire(pkey, pexp) {
  client.expire(pkey, pexp);
}

/**
 * Create value in redis
 * @param {String} pkey Key value
 * @param {String} pvalue value
 * @param {Number} pexp Time in milliseconds
 */
function setValue(pkey, pvalue, pexp) {
  if (!pexp)
    pexp = 86400;
  client.set(pkey, pvalue);
  setExpire(pkey, pexp);
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  getValue: getValue,
  setValue: setValue,
  setExpire: setExpire
};

'use strict';
/**
 * Module Config
 */


/**
 * Dependencies
 */
const fs = require('fs');

/**
 * return default port
 * @return {number} Port number
 */
function getPort() {
  let port = process.env.PORT || 3000;

  if (isNaN(port))
    return 3000;

  return port;
}

/**
 * return mongo url
 * @return {String} Path to Mongo
 */
function getDbUrl() {
  return process.env.MONGO_DB || 'mongodb://localhost:27017/littera';
}

/**
 * return default date format
 * @return {String} Date Format
 */
function getDateFormat() {
  return process.env.DATE_FORMAT || 'DD/MM/YYYY';
}

/**
 * return default date time format
 * @return {String} DateTime format
 */
function getDateTimeFormat() {
  return process.env.DATE_TIME_FORMAT || 'DD/MM/YYYY HH:mm:ss';
}

/**
 * return mongo date time format
 * @return {String} DateTime format
 */
function getDateTimeMongo() {
  return process.env.DATE_TIME_MONGO || 'YYYY-MM-DDTHH:mm:ss.SSS[Z]';
}

/**
 * return secret key
 * @return {String} Secret Key
 */
function getSecret() {
  return process.env.SECRET || '123456';
}

/**
 * return locale
 * @return {String} locale
 */
function getLocale() {
  return process.env.LOCALE || 'pt-BR';
}

/**
 * max size of page
 * @return {Number} max page
 */
function getPageMaxSize() {
  return process.env.PAGE_MAX_SIZE || 100;
}

/**
 * default page size
 * @return {Number} default page size
 */
function getPageSize() {
  return process.env.PAGE_SIZE || 10;
}

/**
 * default domain of application
 * @return {String} default domain
 */
function getDomain() {
  return process.env.DOMAIN || 'littera.pub';
}

/**
 * load env vars
 * @return {Promise} Resolve/Reject
 */
function loadEnv() {
  return new Promise(function(resolve, reject) {
    let path = require('path');
    let local = path.dirname(module.parent.filename);
    local = path.resolve(path.join(local, '../../../'));
    fs.readFile(local + '/.env', 'utf-8', function(err, data) {
      if (err)
        reject(err);
      else {
        let rows = data.split(/\r?\n/);

        for (let i = 0, len = rows.length; i < len; i++) {
          let keyValue = rows[i].split('=');
          process.env[keyValue[0]] = keyValue[1];
        }

        resolve('Variáveis de ambiente carregadas.');
      }
    });
  });
}

/**
 * return redis url
 * @return {String} Path to redis
 */
function getRedisHost() {
  return process.env.REDIS_HOST || 'localhost';
}

/**
 * return redis port
 * @return {String} redis port
 */
function getRedisPort() {
  return process.env.REDIS_PORT || 6379;
}

function getPaypalAppId() {
  return process.env.PAYPAL_APP_ID || 'a';
}

function getPayPalAppSecret() {
  return process.env.PAYPAL_APP_SECRET || 'a';
}

function getPayPalMode() {
  return process.env.PAYPAL_MODE || 'sandbox';
}


/**
 * Path to upload files
 * @return {string}
 */
function getUploadPath() {
  let path = require('path');
  let local = path.dirname(module.parent.filename);
  return path.resolve(path.join(local, '../../../../../')) + '/public/uploads';
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  loadEnv: loadEnv,
  getPort: getPort,
  getDbUrl: getDbUrl,
  getDateFormat: getDateFormat,
  getDateTimeFormat: getDateTimeFormat,
  getDateTimeMongo: getDateTimeMongo,
  getSecret: getSecret,
  getLocale: getLocale,
  getPageMaxSize: getPageMaxSize,
  getPageSize: getPageSize,
  getRedisHost: getRedisHost,
  getRedisPort: getRedisPort,
  getPaypalAppId: getPaypalAppId,
  getPayPalAppSecret: getPayPalAppSecret,
  getPayPalMode: getPayPalMode,
  getUploadPath: getUploadPath,
  getDomain: getDomain
};

'use strict';
/**
 * Module Connection
*/


/**
 * Dependencies
 */
const mongoose   = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const config     = require('../config');
const date       = require('../date');
const handlers   = require('./handlers');
const crypto     = require('../crypto');

/**
 * Mongoose Config
 * @type {Promise}
 */
mongoose.Promise = global.Promise;

/**
 * Generate checksum of object
 * @param  {Object} obj Object to generate checksum
 * @return {String}     checksum value
 */
function generateChecksum(obj) {
  return crypto.generateMd5(JSON.stringify(obj));
}

/**
 * Before execution of bd operations
 * @type {[type]}
 */
/*mongoose.plugin(function(schema, options) {

  schema.pre('validate', function() {
    console.log(arguments);
    console.log('this gets printed first');
  });

  schema.pre('save', function (next) {
    console.log('arguments');
    console.log(arguments);
    if (this.modified)
      this.modified = date.getDateUTC();
    if (this.create_at)
      this.create_at = date.getDateUTC();
    // TODO: Create checksum and md5 function
    if (this.checksum)
      this.checksum = generateChecksum(JSON.parse(JSON.stringify(this)));

    next();
  });

  schema.pre('findOneAndUpdate', function (next) {
    console.log('update');

    console.log(this._collection.collection);
    if (this.modified)
      this.modified = date.getDateUTC();

    if (this.checksum)
      this.checksum = generateChecksum(JSON.parse(JSON.stringify(this)));
    next();
  });
});*/

/**
 * Open Connection
 * @return {Promise} Resolve/Reject
 */
function open() {
  return new Promise(function (resolve, reject) {
    mongoose.connect(config.getDbUrl(), {})
      .then(function () {
        resolve(mongoose.connection);
      })
      .catch(function (err) {
        reject({
          errno: -1945,
          message: err.message
        });
      });
  });
}

/**
 * Convert String to Mongo ObjectId
 * @param  {String} id String to Convert
 * @return {ObjectId}    Object Id
 */
function getObjectId(id) {
  return mongoose.Types.ObjectId(id);
}

/**
 * Module Exports
 * @type {Object}
 */
module.exports = {
  mongoose: mongoose,
  mongoosePaginate: mongoosePaginate,
  types: mongoose.Schema.Types,
  open: open,
  database: mongoose.connection,
  getObjectId: getObjectId,
  handlers: handlers,
  generateChecksum: generateChecksum
};

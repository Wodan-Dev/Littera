'use strict';
/**
 * Module books
 */

/**
 * Create instance to Books Module
 * @param  {Object} app     Express App instance
 * @param  {Object} express Express
 * @param  {String} url     Path url which module will work
 */
module.exports = function (app, express, url, auth) {

  app.use(url + '/books', require('./routes/books.routes.js')(express, auth));

};

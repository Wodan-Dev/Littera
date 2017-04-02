/**
 * Created by jonathan on 01/04/17.
 */
'use strict';
/**
 * Module store
 */


/**
 * Create instance to Books Module
 * @param  {Object} app     Express App instance
 * @param  {Object} express Express
 * @param  {String} url     Path url which module will work
 */
module.exports = function (app, express, url, auth) {

  app.use(url, require('./routes/book_store.routes')(express, auth));

};

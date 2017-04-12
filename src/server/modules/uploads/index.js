/**
 * Created by jonathan on 10/04/17.
 */
'use strict';
/**
 * Module uploads
 */

/**
 * Create instance to Uploads Module
 * @param  {Object} app     Express App instance
 * @param  {Object} express Express
 * @param  {String} url     Path url which module will work
 */
module.exports = function (app, express, url, auth) {

  app.use(url, require('./routes/uploads.routes')(express, auth));
};

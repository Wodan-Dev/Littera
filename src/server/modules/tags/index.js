'use strict';
/**
 * Module tags
 */

/**
 * Create instance to Tags Module
 * @param  {Object} app     Express App instance
 * @param  {Object} express Express
 * @param  {String} url     Path url which module will work
 */
module.exports = function (app, express, url, auth) {

  app.use(url, require('./routes/tags.routes')(express, auth));
};

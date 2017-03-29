/**
 * Created by jonathan on 29/03/17.
 */
'use strict';
/**
 * Module feed
 */

/**
 * Create instance to Books Module
 * @param  {Object} app     Express App instance
 * @param  {Object} express Express
 * @param  {String} url     Path url which module will work
 */
module.exports = function (app, express, url, auth) {

  app.use(url, require('./routes/feed.routes')(express, auth));

};

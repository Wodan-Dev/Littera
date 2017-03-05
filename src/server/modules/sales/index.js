/**
 * Created by jonathan on 05/03/17.
 */
'use strict';
/**
 * Module Sales
 */

/**
 * Create instance to Sales Module
 * @param  {Object} app     Express App instance
 * @param  {Object} express Express
 * @param  {String} url     Path url which module will work
 */
module.exports = function (app, express, url, auth) {

  app.use(url, require('./routes/sales.routes')(express, auth));
};

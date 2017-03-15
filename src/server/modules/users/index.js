/**
 * Created by jonathan on 02/03/17.
 */
'use strict';
/**
 * Module users
 */

/**
 * Create instance to Users Module
 * @param  {Object} app     Express App instance
 * @param  {Object} express Express
 * @param  {String} url     Path url which module will work
 */
module.exports = function (app, express, url, auth) {

  app.use(url, require('./routes/users.routes')(express, auth));
  app.use(url, require('./routes/reviews.routes')(express, auth));
  app.use(url, require('./routes/choices.routes')(express, auth));
  app.use(url, require('./routes/followers.routes')(express, auth));
  app.use(url, require('./routes/following.routes')(express, auth));
};

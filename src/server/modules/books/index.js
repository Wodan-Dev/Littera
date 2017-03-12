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

  app.use(url, require('./routes/books.routes')(express, auth));
  app.use(url, require('./routes/forums.routes')(express, auth));
  app.use(url, require('./routes/posts.routes')(express, auth));
  app.use(url, require('./routes/prices.routes')(express, auth));
  app.use(url, require('./routes/comments.routes')(express, auth));
  app.use(url, require('./routes/keywords.routes')(express, auth));
  app.use(url, require('./routes/rankings.routes')(express, auth));

};

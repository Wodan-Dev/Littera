'use strict';

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const core = require('./modules/core');
const config = core.config;
const auth       = core.authentication;
const redis = require('redis');
const session    = require('express-session');
const redisStore = require('connect-redis')(session);
const client     = redis.createClient();


var app = express();
app.use(logger('dev'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: config.getSecret(),
  resave: false,
  store: new redisStore({
    host: config.getRedisHost(),
    port: config.getRedisPort(),
    client: client,
    ttl: 86400,
    prefix: 'sessions:'
  }),
  saveUninitialized: true
}));



require('./modules/authentication')(app, express, '/mordor', auth.ensureAuthenticated);/*function (req, res, next) {
  next();
});*/

require('./modules/books')(app, express, '/books', function (req, res, next) {
  next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ err: err.message});
});

module.exports = app;

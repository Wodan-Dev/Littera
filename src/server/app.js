'use strict';

const express    = require('express');
const logger     = require('morgan');
const bodyParser = require('body-parser');
const core       = require('./modules/core');
const config     = core.config;
const auth       = core.authentication;
const redis      = require('redis');
const session    = require('express-session');
const redisStore = require('connect-redis')(session);
//const multer     = require('multer');
const client     = redis.createClient();



var app = express();
app.use(logger('dev'));
app.set('view engine', 'jade');
app.use('/content', express.static(config.getUploadPath()+ '/books/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Handle file Uploads
/*app.use(multer({
  dest: getUploadPath(),
  rename: function (fieldname, filename) {
    return filename + Date.now();
  },
  onFileUploadStart: function (file) {
    console.log(file.originalname + ' is starting ...');
  },
  onFileUploadComplete: function (file) {
    console.log(file.fieldname + ' uploaded to  ' + file.path);
    //done = true;
  }
}));*/

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

// Middleware to headers
app.use(function (req, res, next) {

  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Content-Type', 'application/json; charset=utf-8');

  next();
});


require('./modules/authentication')(app, express, '/mordor', auth.ensureAuthenticated);
require('./modules/sales')(app, express, '/sales', auth.ensureAuthenticated);
require('./modules/users')(app, express, '/users', auth.ensureAuthenticated);
require('./modules/books')(app, express, '/books', auth.ensureAuthenticated);
require('./modules/terms')(app, express, '/terms', auth.ensureAuthenticated);
require('./modules/tags')(app, express, '/tags', auth.ensureAuthenticated);
require('./modules/feeds')(app, express, '/feed', auth.ensureAuthenticated);
require('./modules/store')(app, express, '/store', auth.ensureAuthenticated);
require('./modules/uploads')(app, express, '/upload', auth.ensureAuthenticated);
require('./modules/admin')(app, express, '/admin', auth.ensureAuthenticated);

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

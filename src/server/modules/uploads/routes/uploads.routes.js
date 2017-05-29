/**
 * Created by jonathan on 10/04/17.
 */
'use strict';
/**
 * Module uploads.routes
 */

/**
 * Dependencies
 */
const core = require('../../core');
const fs = require('fs');
const multer = require('multer');
const config = core.config;
const utils = core.utils;
const http = core.http;
const validator = core.validator;
const renderError = core.http.renderError;
const HTTP_STATUS = core.http.HTTP_STATUS;


const storageUser = multer.diskStorage({
  destination: function (req, file, cb) {
    let basePath = config.getUploadPath() + '/users/' + req.params.username;
    fs.mkdir(basePath, function(err) {

      cb(null, basePath);
    });
  },
  filename: function (req, file, cb) {
    cb(null, 'cover.png');
  }
});

const storageBook = multer.diskStorage({
  destination: function (req, file, cb) {
    let basePath = config.getUploadPath() + '/books/' + req.params.id;
    fs.mkdir(basePath, function(err) {

      cb(null, basePath);
    });
  },
  filename: function (req, file, cb) {
    cb(null, 'cover.png');
  }
});

const storageContentBook = multer.diskStorage({
  destination: function (req, file, cb) {
    let basePath = config.getUploadPath() + '/books/' + req.params.id;
    fs.mkdir(basePath, function(err) {

      cb(null, basePath);
    });
  },
  filename: function (req, file, cb) {
    cb(null, 'content.epub');
  }
});

const storageDownloadBook = multer.diskStorage({
  destination: function (req, file, cb) {
    let basePath = config.getUploadPath() + '/books/' + req.params.id;
    fs.mkdir(basePath, function(err) {

      cb(null, basePath);
    });
  },
  filename: function (req, file, cb) {
    let name = file.originalname.split('.');
    let ext = name[name.length -1];
    cb(null, 'download.'+ext);
  }
});

//const upload = multer({ storage: storage }).single('image');

/**
 * Method Get in route /users/:username/:file
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function getUserPic(req, res) {

  let basePath = config.getUploadPath() + '/users/' + req.params.username;

  res.writeHead(200, { 'Content-Type': 'image/png' });

  fs.readFile(basePath + '/cover.png', function (err, data) {
    let img = null;
    if (err)
      img = fs.readFileSync(config.getUploadPath() + '/no-image.png');
    else
      img = data;
    res.end(img, 'binary');
  });
}

function postUserPic(req, res) {

  res.status(200).end();
}

/**
 * Method Get in route /books/:id
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function getBookPic(req, res) {

  let basePath = config.getUploadPath() + '/books/' + req.params.id;

  res.writeHead(200, { 'Content-Type': 'image/png' });

  fs.readFile(basePath + '/cover.png', function (err, data) {
    let img = null;
    if (err)
      img = fs.readFileSync(config.getUploadPath() + '/no-image.png');
    else
      img = data;
    res.end(img, 'binary');
  });
}

function postBookPic(req, res) {

  res.status(200).end();

}

function postBookContent(req, res) {
  res.status(200).end();
}

function postBookDownload(req, res) {
  res.status(200).end();
}



/**
 * Create Instance to router object
 * @param  {Object} express Express
 * @return {Router}         router object with the routes
 */
function router(express, auth) {
  let routes = express.Router();

  routes.get('/users/:username', getUserPic);
  routes.post('/users/:username',
    multer({ storage: storageUser }).single('image'),
    auth,
    postUserPic);

  routes.get('/books/:id', getBookPic);
  routes.post('/books/:id',
    multer({ storage: storageBook }).single('image'),
    auth,
    postBookPic);

  routes.post('/books/content/:id',
    multer({ storage: storageContentBook }).single('content'),
    auth,
    postBookContent);

  routes.post('/books/download/:id',
    multer({ storage: storageDownloadBook }).single('download'),
    auth,
    postBookDownload);

  return routes;
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = router;

'use strict';
/**
 * Module Books
 */

/**
 * Dependencies
 */
const core = require('../../core');
const booksModel = require('../../../models/books/books.model');
const commentsModel = require('../../../models/books/comments.model');
const http = core.http;
const utils = core.utils;
const validator = core.validator;
const renderError = core.http.renderError;

/**
 * Method Get in route /
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function get(req, res) {
  let id_book = req.params.id_book || '';
  //let pageNum = utils.normalizeNumber(req.query.page || 1, 1);

  validator.validateId(id_book)
    .then(function(rIdBook) {
      id_book = rIdBook;
      return booksModel.findById(id_book);
    })
    .then(function (result) {
      http.render(res, result.comments);
    })
    .catch(function (err) {
      renderError(res, {}, err);
    });
}

/**
 * Method Get in route /:id
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */

function getById(req, res) {

  let id_book = req.params.id_book || '';
  let id = req.params.id || '';
  //let pageNum = utils.normalizeNumber(req.query.page || 1, 1);

  validator.validateId(id_book)
    .then(function(rIdBook) {
      id_book = rIdBook;
      return validator.validateId(id);
    })
    .then(function (rId) {
      id = rId;
      return booksModel.findById(id_book);
    })
    .then(function (result) {
      http.render(res, result.comments.id(id));
    })
    .catch(function (err) {
      renderError(res, {}, err);
    });
}

/**
 * Method Post in route /
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function post(req, res) {

  let id_book = req.body._id_book || '';

  let comment = {
    _id_user: req.body._id_user || '',
    content: req.body.content || ''
  };

  validator.validateId(id_book)
    .then(function (rIdBook) {
      id_book = rIdBook;
      return commentsModel.validateCreate(comment);
    })
    .then(function(result) {
      return commentsModel.insert(id_book, result.value);
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, comment, err);
    });
}

/**
 * Method Put in route /
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function put(req, res) {

  let id_book = req.body._id_book || '';

  let comment = {
    _id: req.body._id || '',
    _id_user: req.body._id_user || '',
    content: req.body.content || ''
  };

  validator.validateId(id_book)
    .then(function (rIdBook) {
      id_book = rIdBook;
      return validator.validateId(comment._id);
    })
    .then(function (rId) {
      comment._id = rId;
      return commentsModel.validateUpdate(comment);
    })
    .then(function(result) {
      return commentsModel.update(id_book, result.value);
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, comment, err);
    });
}

/**
 * Method Delete in route /:id
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function remove(req, res) {

  let id_book = req.params.id_book || '';
  let comment = {
    _id: req.params.id || ''
  };

  validator.validateId(id_book)
    .then(function(rBookId) {
      id_book = rBookId;
      return validator.validateId(comment._id);
    })
    .then(function(rId) {
      comment._id = rId;
      return commentsModel.remove(id_book, comment._id);
    })
    .then(function(result) {
      http.render(res, result);
    })
    .catch(function(err) {
      renderError(res, comment, err);
    });
}

/**
 * Create Instance to router object
 * @param  {Object} express Express
 * @return {Router}         router object with the routes
 */
function router(express) {
  let routes = express.Router();

  routes.get('/:id_book/comments', get);
  routes.get('/:id_book/comments/:id', getById);
  routes.post('/comments', post);
  routes.put('/comments', put);
  routes.delete('/:id_book/comments/:id', remove);

  return routes;
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = router;

'use strict';
/**
 * Module Books
 */

/**
 * Dependencies
 */
const core = require('../../core');
const booksModel = require('../../../models/books/books.model');
const keywordsModel = require('../../../models/books/keywords.model');
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
      http.render(res, result.keywords);
    })
    .catch(function (err) {
      renderError(res, {}, err);
    });
    // FIXME: teste
    // IDEA: vamo
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
      http.render(res, result.keywords.id(id));
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

  let keyword = {
    content: req.body.content || ''
  };

  validator.validateId(id_book)
    .then(function (rIdBook) {
      id_book = rIdBook;
      return keywordsModel.validateCreate(keyword);
    })
    .then(function(result) {
      return keywordsModel.insert(id_book, result.value);
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, keyword, err);
    });
}

/**
 * Method Put in route /
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function put(req, res) {
  http.render(res, 'Not Allowed',
    http.HTTP_STATUS.HTTP_405_METHOD_NOT_ALLOWED);
}

/**
 * Method Delete in route /:id
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function remove(req, res) {

  let id_book = req.params.id_book || '';
  let keyword = {
    _id: req.params.id || ''
  };

  validator.validateId(id_book)
    .then(function(rBookId) {
      id_book = rBookId;
      return validator.validateId(keyword._id);
    })
    .then(function(rId) {
      keyword._id = rId;
      return keywordsModel.remove(id_book, keyword._id);
    })
    .then(function(result) {
      http.render(res, result);
    })
    .catch(function(err) {
      renderError(res, keyword, err);
    });
}

/**
 * Create Instance to router object
 * @param  {Object} express Express
 * @return {Router}         router object with the routes
 */
function router(express) {
  let routes = express.Router();

  routes.get('/:id_book/keywords', get);
  routes.get('/:id_book/keywords/:id', getById);
  routes.post('/keywords', post);
  routes.put('/keywords', put);
  routes.delete('/:id_book/keywords/:id', remove);

  return routes;
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = router;

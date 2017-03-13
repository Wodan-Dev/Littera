'use strict';
/**
 * Module Books
 */

/**
 * Dependencies
 */
const core = require('../../core');
const booksModel = require('../../../models/books/books.model.js');
const http = core.http;
const date = core.date;
const utils = core.utils;
const validator = core.validator;
const renderError = core.http.renderError;

/**
 * Method Get in route /
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function get(req, res) {
  let pageNum = utils.normalizeNumber(req.query.page || 1, 1);
  booksModel.list(pageNum)
    .then(function (result) {
      http.render(res, result);
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

  let id = req.params.id || '';

  validator.validateId(id)
    .then(booksModel.findById)
    .then(function (result) {
      http.render(res, result);
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

  let book = {
    title: req.body.title || '',
    synopsis: req.body.synopsis || '',
    content: req.body.content || '',
    status: req.body.status || 0,
    percentage: req.body.percentage || 0,
    esbn: req.body.esbn || '',
    date_published: req.body.date_published || '',
    visible: req.body.visible || 0,
    language: req.body.language || '',
    average_star: req.body.average_star || 0
  };

  booksModel.validateCreate(book)
    .then(function (result) {
      return booksModel.insert(result.value);
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, book, err);
    });
}

/**
 * Method Put in route /
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function put(req, res) {

  let book = {
    _id: req.body._id || '',
    title: req.body.title || '',
    synopsis: req.body.synopsis || '',
    content: req.body.content || '',
    status: req.body.status || 0,
    percentage: req.body.percentage || 0,
    esbn: req.body.esbn || '',
    date_published: req.body.date_published,
    visible: req.body.visible || 0,
    language: req.body.language || '',
    average_star: req.body.average_star || 0
  };
  booksModel.validateUpdate(book)
    .then(function (rbook) {
      return booksModel.update(rbook.value._id, rbook.value);
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, book, err);
    });
}

/**
 * Method Delete in route /:id
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function remove(req, res) {
  http.render(res, 'Not Allowed',
    http.HTTP_STATUS.HTTP_405_METHOD_NOT_ALLOWED);
}

/**
 * Create Instance to router object
 * @param  {Object} express Express
 * @return {Router}         router object with the routes
 */
function router(express, auth) {
  let routes = express.Router();

  routes.get('/', auth, get);
  routes.get('/:id', auth, getById);
  routes.post('/', auth, post);
  routes.put('/', auth, put);
  routes.delete('/:id', auth, remove);

  return routes;
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = router;

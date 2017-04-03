/**
 * Created by jonathan on 01/04/17.
 */
'use strict';
/**
 * Module store
 */

/**
 * Dependencies
 */
const core = require('../../core');
const booksModel = require('../../../models/books/books.model.js');
const http = core.http;
const utils = core.utils;
const validator = core.validator;
const renderError = core.http.renderError;
const HTTP_STATUS = core.http.HTTP_STATUS;
const date = core.date;

/**
 * Method Get in route /
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function get(req, res) {
  let pageNum = utils.normalizeNumber(req.query.page || 1, 1);
  booksModel.listStore(pageNum)
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
  let id = req.params.id;
  validator.validateId(id)
    .then(booksModel.findByIdStore)
    .then(function (result) {
      if (!result.length)
        renderError(res, {}, result, HTTP_STATUS.HTTP_404_NOT_FOUND);
      else
        http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, {}, err);
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

  routes.get('/', get);
  routes.get('/:id', getById);
  routes.get('/', remove);

  return routes;
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = router;

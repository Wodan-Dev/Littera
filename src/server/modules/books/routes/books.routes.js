'use strict';
/**
 * Module authentication
 */

/**
 * Dependencies
 */
const core = require('../../core');
const booksModel = require('../model/books.model');
//const booksCtrl = require('../controller/books.controller');
const http = core.http;
const utils = core.utils;
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
 * Method Post in route /
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function post(req, res) {

  let book = {
    title: req.body.title || '',
    synopsis: req.body.synopsis || '',
    content: req.body.content || '',
    status: req.body.status || '',
    percentage: req.body.percentage || '',
    esbn: req.body.esbn || '',
    date_published: req.body.date_published || '',
    visible: req.body.visible || '',
    language: req.body.language || '',
    average_stars: req.body.average_stars || ''
  };

  console.log(book);

  booksModel.validateCreate(book)
    .then(function (result) {
      return booksModel.insert(result);
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, book, err);
    });

}

/**
 * Create Instance to router object
 * @param  {Object} express Express
 * @return {Router}         router object with the routes
 */
function router(express) {
  let routes = express.Router();

  routes.get('/', get);
  //routes.get('/:id', getById);
  routes.post('/', post);
  //routes.put('/', put);
  //routes.delete('/:id', remove);

  return routes;
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = router;

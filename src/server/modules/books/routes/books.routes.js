'use strict';
/**
 * Module Books
 */

/**
 * Dependencies
 */
const core = require('../../core');
const booksModel = require('../model/books.model');
//const booksCtrl = require('../controller/books.controller');
const http = core.http;
const date = core.date;
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
    status: req.body.status || 0,
    percentage: req.body.percentage || 0,
    esbn: req.body.esbn || '',
    date_published: req.body.date_published || date.getDateUTC(),
    visible: req.body.visible || 0,
    language: req.body.language || '',
    average_star: req.body.average_star || 0
  };
  console.log('book');
  console.log(book);

  booksModel.validateCreate(book)
    .then(function (result) {
      console.log('validou ok');
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

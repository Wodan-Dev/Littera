'use strict';
/**
 * Module Books
 */

/**
 * Dependencies
 */
const core = require('../../core');
const booksModel = require('../../../models/books/books.model.js');
const writtenBooksModel = require('../../../models/users/written_books.model');
const http = core.http;
const utils = core.utils;
const validator = core.validator;
const renderError = core.http.renderError;
const date = core.date;

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
 * Method Get in route /:id
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function getPrice(req, res) {

  let id = req.params.id || '';

  validator.validateId(id)
    .then(function(rId) {
      id = rId;
      return booksModel.findPrice(id);
    })
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

  let user ={
    _id_user: req.body._id_user || ''
  };

  let book = {
    title: req.body.title || '',
    subtitle: req.body.subtitle || '',
    synopsis: req.body.synopsis || '',
    content: req.body.content || '',
    status: (req.body.status || 0).toString(),
    percentage: (req.body.percentage || 0).toString(),
    esbn: req.body.esbn || '',
    esbn_13: req.body.esbn_13 || '',
    parental_rating: (req.body.parental_rating || 0).toString(),
    date_published: req.body.date_published || '',
    visible: (req.body.visible || 0).toString(),
    language: req.body.language || '',
    average_star: (req.body.average_star || 0).toString(),
    prices: req.body.prices || [],
    forums: req.body.forums || [],
    rankings: req.body.rankings || [],
    keywords: req.body.keywords || [],
    comments: req.body.comments || [],
    cover_image: req.body.cover_image || ''
  };

  booksModel.validateCreate(book)
    .then(function (result) {
      return booksModel.insert(result.value);
    })
    .then(function (result) {
      book = result;
      return writtenBooksModel.insert(user._id_user, {
        _id_book: book._id
      });
    })
    .then(function () {
      http.render(res, book);
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
    subtitle: req.body.subtitle || '',
    synopsis: req.body.synopsis || '',
    content: req.body.content || '',
    status: (req.body.status || 0).toString(),
    percentage: (req.body.percentage || 0).toString(),
    esbn: req.body.esbn || '',
    esbn_13: req.body.esbn_13 || '',
    parental_rating: (req.body.parental_rating || 0).toString(),
    date_published: req.body.date_published,
    visible: (req.body.visible || 0).toString(),
    language: req.body.language || '',
    average_star: (req.body.average_star || 0).toString(),
    prices: req.body.prices || [],
    forums: req.body.forums || [],
    rankings: req.body.rankings || [],
    keywords: req.body.keywords || [],
    comments: req.body.comments || [],
    cover_image: req.body.cover_image || ''
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

  routes.get('/', get);
  routes.get('/:id', getById);
  routes.get('/:id/pricing', getPrice);
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

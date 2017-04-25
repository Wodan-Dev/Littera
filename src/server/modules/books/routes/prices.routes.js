'use strict';
/**
 * Module Books
 */

/**
 * Dependencies
 */
const core = require('../../core');
const booksModel = require('../../../models/books/books.model');
const pricesModel = require('../../../models/books/prices.model');
const pricesCtrl = require('../controller/prices.controller');
const http = core.http;
const validator = core.validator;
const renderError = core.http.renderError;

/**
 * Method Get in route /
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function get(req, res) {
  let id_book = req.params.id_book || '';

  validator.validateId(id_book)
    .then(function(rIdBook) {
      id_book = rIdBook;
      return booksModel.findById(id_book);
    })
    .then(function (result) {
      http.render(res, result.prices);
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
      http.render(res, result.prices.id(id));
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

  let price = {
    price_min: (req.body.price_min || 0).toString(),
    price_sug: (req.body.price_sug || 0).toString(),
    active: (req.body.active || 0).toString(),
    type: (req.body.type || 0).toString()
  };

  validator.validateId(id_book)
    .then(function (rIdBook) {
      id_book = rIdBook;
      return pricesModel.validateCreate(price);
    })
    .then(function(result) {
      price = result.value;
      return pricesCtrl.validatePrice(id_book, price.type);
    })
    .then(function() {
      return pricesModel.insert(id_book, price);
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, price, err);
    });
}

/**
 * Method Put in route /
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function put(req, res) {

  let id_book = req.body._id_book || '';

  let price = {
    _id: req.body._id || '',
    price_min: (req.body.price_min || 0).toString(),
    price_sug: (req.body.price_sug || 0).toString(),
    active: (req.body.active || 0).toString(),
    type: (req.body.type || 0).toString()
  };

  validator.validateId(id_book)
    .then(function (rIdBook) {
      id_book = rIdBook;
      return validator.validateId(price._id);
    })
    .then(function (rId) {
      price._id = rId;
      return pricesModel.validateUpdate(price);
    })
    .then(function(result) {
      return pricesModel.update(id_book, result.value);
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, price, err);
    });
}

/**
 * Method Delete in route /:id
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function remove(req, res) {

  let id_book = req.params.id_book || '';
  let price = {
    _id: req.params.id || ''
  };

  validator.validateId(id_book)
    .then(function(rBookId) {
      id_book = rBookId;
      return validator.validateId(price._id);
    })
    .then(function(rId) {
      price._id = rId;
      return pricesModel.remove(id_book, price._id);
    })
    .then(function(result) {
      http.render(res, result);
    })
    .catch(function(err) {
      renderError(res, price, err);
    });
}

/**
 * Create Instance to router object
 * @param  {Object} express Express
 * @return {Router}         router object with the routes
 */
function router(express) {
  let routes = express.Router();

  routes.get('/:id_book/prices', get);
  routes.get('/:id_book/prices/:id', getById);
  routes.post('/prices', post);
  routes.put('/prices', put);
  routes.delete('/:id_book/prices/:id', remove);

  return routes;
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = router;

'use strict';
/**
 * Module Books
 */

/**
 * Dependencies
 */
const core = require('../../core');
const rankingsModel = require('../../../models/books/rankings.model');
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
  //let pageNum = utils.normalizeNumber(req.query.page || 1, 1);

  validator.validateId(id_book)
    .then(function(rIdBook) {
      id_book = rIdBook;
      return rankingsModel.listByBook(id_book);
    })
    .then(function (result) {
      http.render(res, result.rankings);
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
      return rankingsModel.listByBook(id_book);
    })
    .then(function (result) {
      http.render(res, result.rankings.id(id));
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

  let ranking = {
    _id_user: req.body._id_user || '',
    comment: req.body.comment || '',
    stars: req.body.stars || 0
  };

  validator.validateId(id_book)
    .then(function (rIdBook) {
      id_book = rIdBook;
      return rankingsModel.validateCreate(ranking);
    })
    .then(function(result) {
      return rankingsModel.insert(id_book, result.value);
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, ranking, err);
    });
}

/**
 * Method Put in route /
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function put(req, res) {

  let id_book = req.body._id_book || '';

  let ranking = {
    _id: req.body._id || '',
    _id_user: req.body._id_user || '',
    comment: req.body.comment || '',
    stars: req.body.stars || 0
  };

  validator.validateId(id_book)
    .then(function (rIdBook) {
      id_book = rIdBook;
      return validator.validateId(ranking._id);
    })
    .then(function (rId) {
      ranking._id = rId;
      return rankingsModel.validateUpdate(ranking);
    })
    .then(function(result) {
      return rankingsModel.update(id_book, result.value);
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, ranking, err);
    });
}

/**
 * Method Delete in route /:id
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function remove(req, res) {

  let id_book = req.params.id_book || '';
  let ranking = {
    _id: req.params.id || ''
  };

  validator.validateId(id_book)
    .then(function(rBookId) {
      id_book = rBookId;
      return validator.validateId(ranking._id);
    })
    .then(function(rId) {
      ranking._id = rId;
      return rankingsModel.remove(id_book, ranking._id);
    })
    .then(function(result) {
      http.render(res, result);
    })
    .catch(function(err) {
      renderError(res, ranking, err);
    });
}

/**
 * Create Instance to router object
 * @param  {Object} express Express
 * @return {Router}         router object with the routes
 */
function router(express) {
  let routes = express.Router();

  routes.get('/:id_book/rankings', get);
  routes.get('/:id_book/rankings/:id', getById);
  routes.post('/rankings', post);
  routes.put('/rankings', put);
  routes.delete('/:id_book/rankings/:id', remove);

  return routes;
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = router;

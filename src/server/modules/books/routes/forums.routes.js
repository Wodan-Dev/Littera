'use strict';
/**
 * Module Books
 */

/**
 * Dependencies
 */
const core = require('../../core');
const forumsModel = require('../../../models/books/forums.model');
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
      return forumsModel.listByBook(id_book);
    })
    .then(function (result) {
      http.render(res, result.forums);
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
      return forumsModel.listByBook(id_book);
    })
    .then(function (result) {
      http.render(res, result.forums.id(id));
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

  let forum = {
    _id_user: req.body._id_user || '',
    title: req.body.title || '',
    content: req.body.content || ''
  };

  validator.validateId(id_book)
    .then(function (rIdBook) {
      id_book = rIdBook;
      return forumsModel.validateCreate(forum);
    })
    .then(function(result) {
      return forumsModel.insert(id_book, result.value);
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, forum, err);
    });
}

/**
 * Method Put in route /
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function put(req, res) {

  let id_book = req.body._id_book || '';

  let forum = {
    _id: req.body._id || '',
    _id_user: req.body._id_user || '',
    title: req.body.title || '',
    content: req.body.content || ''
  };

  validator.validateId(id_book)
    .then(function (rIdBook) {
      id_book = rIdBook;
      return validator.validateId(forum._id);
    })
    .then(function (rId) {
      forum._id = rId;
      return forumsModel.validateUpdate(forum);
    })
    .then(function(result) {
      return forumsModel.update(id_book, result.value);
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, forum, err);
    });
}

/**
 * Method Delete in route /:id
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function remove(req, res) {

  let id_book = req.params.id_book || '';
  let forum = {
    _id: req.params.id || ''
  };

  validator.validateId(id_book)
    .then(function(rBookId) {
      id_book = rBookId;
      return validator.validateId(forum._id);
    })
    .then(function(rId) {
      forum._id = rId;
      return forumsModel.remove(id_book, forum._id);
    })
    .then(function(result) {
      http.render(res, result);
    })
    .catch(function(err) {
      renderError(res, forum, err);
    });
}

/**
 * Create Instance to router object
 * @param  {Object} express Express
 * @return {Router}         router object with the routes
 */
function router(express) {
  let routes = express.Router();

  routes.get('/:id_book/forums', get);
  routes.get('/:id_book/forums/:id', getById);
  routes.post('/forums', post);
  routes.put('/forums', put);
  routes.delete('/:id_book/forums/:id', remove);

  return routes;
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = router;

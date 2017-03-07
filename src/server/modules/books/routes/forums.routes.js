'use strict';
/**
 * Module Books
 */

/**
 * Dependencies
 */
const core = require('../../core');
const booksModel = require('../../../models/books/books.model');
const forumsModel = require('../../../models/books/forums.model');
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
  let book_id = req.params.book_id;
  let pageNum = utils.normalizeNumber(req.query.page || 1, 1);

  validator.validateId(book_id)
    .then(booksModel.findById)
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
  let id = req.params.id;

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

  let book_id = req.body.book_id;

  let forum = {
    _id_user: req.body._id_user || '',
    title: req.body.title || '',
    content: req.body.content || ''
  };

  validator.validateId(book_id)
    .then(function (rIdBook) {
      book_id = rIdBook;
      return forumsModel.validateForumCreate(forum);
    })
    .then(function(result) {
      return forumsModel.insertForum(book_id, result.value);
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      console.log(err);
      renderError(res, forum, err);
    });
}

/**
 * Method Put in route /
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function put(req, res) {

  let book_id = req.body.book_id;
  let _id = req.body._id;

  let forum = {
    _id: req.body._id || '',
    _id_user: req.body._id_user || '',
    title: req.body.title || '',
    content: req.body.content || ''
  };

  validator.validateId(book_id)
    .then(function (rIdBook) {
      book_id = rIdBook;
      return forumsModel.validateForumUpdate(forum);
    })
    .then(function(result) {
      return forumsModel.updateForum(book_id, _id, result.value);
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      console.log(err);
      renderError(res, forum, err);
    });
}

/**
 * Method Delete in route /:id
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function remove(req, res) {

  let book_id = req.params.book_id;
  let _id = req.params.id;

  let forum = {
    _id: req.body._id || '',
    _id_user: req.body._id_user || ''
  };

  validator.validateId(book_id)
    .then(function(rBookId) {
      book_id = rBookId;
      return validator.validateId(_id);
    })
    .then(function(rId) {
      _id = rId;
      return forumsModel.removeForum(book_id, _id);
    })
    .then(function(result) {
      http.render(res, result);
    })
    .catch(function(err) {
      console.log(err);
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

  routes.get('/:book_id/forums', get);
  routes.get('/:book_id/forums/:id', getById);
  routes.post('/forums', post);
  routes.put('/forums', put);
  routes.delete('/:book_id/forums/:id', remove);

  return routes;
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = router;

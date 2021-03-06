'use strict';
/**
 * Module Books
 */

/**
 * Dependencies
 */
const core = require('../../core');
const postsModel = require('../../../models/books/posts.model');
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
  let id_forum = req.params.id_forum || '';
  //let pageNum = utils.normalizeNumber(req.query.page || 1, 1);

  validator.validateId(id_book)
    .then(function(rIdBook) {
      id_book = rIdBook;
      return validator.validateId(id_forum);
    })
    .then(function (rIdForum) {
      id_forum = rIdForum;
      return postsModel.listByBook(id_book);
    })
    .then(function (result) {
      http.render(res, result.forums.id(id_forum).posts);
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
  let id_forum = req.params.id_forum || '';
  let id = req.params.id || '';
  //let pageNum = utils.normalizeNumber(req.query.page || 1, 1);

  validator.validateId(id_book)
    .then(function(rIdBook) {
      id_book = rIdBook;
      return validator.validateId(id_forum);
    })
    .then(function (rIdForum) {
      id_forum = rIdForum;
      return validator.validateId(id);
    })
    .then(function (rId) {
      id = rId;
      return postsModel.listByBook(id_book);
    })
    .then(function (result) {
      http.render(res, result.forums.id(id_forum).posts.id(id));
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
  let id_forum = req.body._id_forum || '';

  let data = {
    _id_user: req.body._id_user || '',
    content: req.body.content || '',
    spoiler: req.body.spoiler || 0
  };

  validator.validateId(id_book)
    .then(function(rIdBook) {
      id_book = rIdBook;
      return validator.validateId(id_forum);
    })
    .then(function (rIdForum) {
      id_forum = rIdForum;
      return postsModel.validatePostCreate(data);
    })
    .then(function(result) {
      return postsModel.insert(id_book, id_forum, result.value);
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, data, err);
    });
}

/**
 * Method Put in route /
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function put(req, res) {

  let id_book = req.body._id_book || '';
  let id_forum = req.body._id_forum || '';

  let post = {
    _id: req.body._id || '',
    _id_user: req.body._id_user || '',
    content: req.body.content || '',
    spoiler: req.body.spoiler || 0
  };

  validator.validateId(id_book)
    .then(function (rIdBook) {
      id_book = rIdBook;
      return validator.validateId(id_forum);
    })
    .then(function (rIdForum) {
      id_forum = rIdForum;
      return validator.validateId(post._id);
    })
    .then(function (rId) {
      post._id = rId;
      return postsModel.validatePostUpdate(post);
    })
    .then(function(result) {
      return postsModel.update(id_book, id_forum, result.value);
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, post, err);
    });
}

/**
 * Method Delete in route /:id
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function remove(req, res) {

  let id_book = req.params.id_book || '';
  let id_forum = req.params.id_forum || '';
  let id = req.params.id || '';

  let forum = {
    _id: req.body._id
  };

  validator.validateId(id_book)
    .then(function(rIdBook) {
      id_book = rIdBook;
      return validator.validateId(id_forum);
    })
    .then(function(rIdForum) {
      id_forum = rIdForum;
      return validator.validateId(id);
    })
    .then(function(rId) {
      id = rId;
      return postsModel.remove(id_book, id_forum, id);
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

  routes.get('/:id_book/forums/:id_forum/posts', get);
  routes.get('/:id_book/forums/:id_forum/posts/:id', getById);
  routes.post('/forums/posts', post);
  routes.put('/forums/posts', put);
  routes.delete('/:id_book/forums/:id_forum/posts/:id', remove);

  return routes;
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = router;

/**
 * Created by jonathan on 29/03/17.
 */
'use strict';
/**
 * Module users
 */

/**
 * Dependencies
 */
const core = require('../../core');
const writtenBooksModel = require('../../../models/users/written_books.model');
const usersModel = require('../../../models/users/users.model');
const writtenBooksCtrl = require('../controller/written_books.controller');
const http = core.http;
const validator = core.validator;
const utils = core.utils;
const renderError = core.http.renderError;

/**
 * Method Get in route /:id
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function getById(req, res) {
  let pageNum = utils.normalizeNumber(req.query.page || 1, 1);
  let username = req.params.username || '-';

  writtenBooksModel.listByUser(username, pageNum)
    .then(function (result) {
      http.render(res, result.wishlist);
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

  let username = req.params.username || '-';

  let userWrittens = {
    _id_book: req.body._id_book || ''
  };


  validator.validateId(userWrittens._id_book)
    .then(function (rId) {
      userWrittens._id_book = rId;
      return writtenBooksModel.validateCreate(userWrittens);
    })
    .then(function (result) {
      userWrittens = result.value;
      return usersModel.findByUserName(username);
    })
    .then(function (user) {
      return writtenBooksCtrl.validateWrite(user._id, userWrittens._id_book);
    })
    .then(function (id) {
      return writtenBooksModel.insert(id, userWrittens);
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, err, err);
    });
}

/**
 * Method Delete in route /:id
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function remove(req, res) {
  let username = req.params.username || '-';

  let userWrittens = {
    _id_book: req.params.id || ''
  };


  validator.validateId(userWrittens._id_book)
    .then(function (rId) {
      userWrittens._id_book = rId;
      return usersModel.findByUserName(username);
    })
    .then(function (user) {
      userWrittens._id = user._id;

      return writtenBooksModel.remove(userWrittens);
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, err, err);
    });
}

/**
 * Create Instance to router object
 * @param  {Object} express Express
 * @return {Router}         router object with the routes
 * @param  {Function} auth     Authentication Function
 */
function router(express, auth) {
  let routes = express.Router();

  routes.get('/:username/written/', auth, getById);
  routes.post('/:username/written/', auth, post);
  routes.delete('/:username/written/:id', auth, remove);

  return routes;
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = router;


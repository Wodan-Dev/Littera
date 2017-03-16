/**
 * Created by jonathan on 16/03/17.
 */
'use strict';
/**
 * Module users
 */

/**
 * Dependencies
 */
const core = require('../../core');
const wishListModel = require('../../../models/users/wishlist.model');
const usersModel = require('../../../models/users/users.model');
const wishListCtrl = require('../controller/wishlist.controller');
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

  wishListModel.listByUser(username, pageNum)
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

  let userWish = {
    _id_book: req.body._id_book || ''
  };


  validator.validateId(userWish._id_book)
    .then(function (rId) {
      userWish._id_book = rId;
      return wishListModel.validateCreate(userWish);
    })
    .then(function (result) {
      userWish = result.value;
      return usersModel.findByUserName(username);
    })
    .then(function (user) {
      return wishListCtrl.validateWish(user._id, userWish._id_book);
    })
    .then(function (id) {
      return wishListModel.insert(id, userWish);
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

  let userWish = {
    _id_book: req.params.id || ''
  };


  validator.validateId(userWish._id_book)
    .then(function (rId) {
      userWish._id_book = rId;
      return usersModel.findByUserName(username);
    })
    .then(function (user) {
      userWish._id = user._id;

      return wishListModel.remove(userWish);
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

  routes.get('/:username/wish/', auth, getById);
  routes.post('/:username/wish/', auth, post);
  routes.delete('/:username/wish/:id', auth, remove);

  return routes;
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = router;

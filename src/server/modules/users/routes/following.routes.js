/**
 * Created by jonathan on 15/03/17.
 */
'use strict';
/**
 * Module users
 */

/**
 * Dependencies
 */

const core = require('../../core');
const followingModel = require('../../../models/users/following.model');
const usersModel = require('../../../models/users/users.model');
const followingCtrl = require('../controller/following.controller');
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

  followingModel.listByUser(username, pageNum)
    .then(function (result) {
      http.render(res, result.following);
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

  let userFollow = {
    _id_user_follow: req.body._id_user_follow || ''
  };


  validator.validateId(userFollow._id_user_follow)
    .then(function (rId) {
      userFollow._id_user_follow = rId;
      return followingModel.validateCreate(userFollow);
    })
    .then(function (result) {
      userFollow = result.value;
      return usersModel.findByUserName(username);
    })
    .then(function (user) {
      return followingCtrl.validateFollower(user._id, userFollow._id_user_follow);
    })
    .then(function (id) {
      return followingModel.insert(id, userFollow);
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

  let userFollow = {
    _id_follow: req.params.id || ''
  };


  validator.validateId(userFollow._id_follow)
    .then(function (rId) {
      userFollow._id_follow = rId;
      return usersModel.findByUserName(username);
    })
    .then(function (user) {
      userFollow._id = user._id;

      return followingModel.remove(userFollow);
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
 */
function router(express, auth) {
  let routes = express.Router();

  routes.get('/:username/following/', auth, getById);
  routes.post('/:username/following/', auth, post);
  routes.delete('/:username/following/:id', auth, remove);

  return routes;
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = router;

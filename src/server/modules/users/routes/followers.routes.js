/**
 * Created by jonathan on 14/03/17.
 */
'use strict';
/**
 * Module users
 */

/**
 * Dependencies
 */

const core = require('../../core');
const followersModel = require('../../../models/users/followers.model');
const usersModel = require('../../../models/users/users.model');
const followersCtrl = require('../controller/followers.controller');
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

  followersModel.listByUser(username, pageNum)
    .then(function (result) {
      http.render(res, result.followers);
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
      return followersModel.validateCreate(userFollow);
    })
    .then(function (result) {
      userFollow = result.value;
      return usersModel.findByUserName(username);
    })
    .then(function (user) {
      return followersCtrl.validateFollower(user._id, userFollow._id_user_follow);
    })
    .then(function (id) {
      return followersModel.insert(id, userFollow);
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

      return followersModel.remove(userFollow);
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

  routes.get('/:username/followers/', auth, getById);
  routes.post('/:username/followers/', auth, post);
  routes.delete('/:username/followers/:id', auth, remove);

  return routes;
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = router;


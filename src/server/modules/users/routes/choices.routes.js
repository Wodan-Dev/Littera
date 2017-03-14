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
const choicesModel = require('../../../models/users/choices.model');
const usersModel = require('../../../models/users/users.model');
const http = core.http;
const utils = core.utils;
const date = core.date;
const validator = core.validator;
const renderError = core.http.renderError;

/**
 * Method Get in route /
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function get(req, res) {
  let pageNum = utils.normalizeNumber(req.query.page || 1, 1);
  let username = req.params.username || '-';

  choicesModel.listByUser(username, pageNum)
    .then(function (result) {
      http.render(res, result.choices);
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

  let username = req.params.username || '-';
  let id = req.params.id || '-';

  validator.validateId(id)
    .then(function (rId) {
      id = rId;
      return usersModel.findByUserName(username);
    })
    .then(function (user) {
      let choice = {
        _id: user._id,
        _idChoice: id
      };

      return choicesModel.findById(choice);
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

  let _id = req.body._id_user_choice || '';
  let choice = {
    content: req.body.content || ''
  };

  validator.validateId(_id)
    .then(function (rId) {
      _id = rId;
      return choicesModel.validateCreate(choice);
    })
    .then(function (result) {
      return choicesModel.insert(_id, result.value);
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, choice, err);
    });
}

/**
 * Method Put in route /
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function put(req, res) {


  let _id = req.body._id_user_choice || '';

  let choice = {
    _id: req.body._id_choice || '',
    content: req.body.content || ''
  };

  validator.validateId(_id)
    .then(function (rId) {
      _id = rId;
      return validator.validateId(choice._id);
    })
    .then(function (rId) {
      choice._id = rId;
      return choicesModel.validateUpdate(choice);
    })
    .then(function (result) {
      return choicesModel.update(_id, result.value);
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, choice, err);
    });
}

/**
 * Method Delete in route /:id
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function remove(req, res) {
  let username = req.params.username || '';
  let choice = {
    _idChoice: req.params.id || ''
  };

  validator.validateId(choice._idChoice)
    .then(function (rId) {
      choice._idChoice = rId;
      return usersModel.findByUserName(username);
    })
    .then(function (user) {
      choice._id = user._id;
      return choicesModel.remove(choice);
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, choice, err);
    });
}

/**
 * Create Instance to router object
 * @param  {Object} express Express
 * @param  {Function} auth authentication
 * @return {Router}         router object with the routes
 */
function router(express, auth) {
  let routes = express.Router();

  routes.get('/:username/choices/', auth, get);
  routes.get('/:username/choices/:id', auth, getById);
  routes.post('/:username/choices/', auth, post);
  routes.put('/:username/choices/', auth, put);
  routes.delete('/:username/choices/:id', auth, remove);

  return routes;
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = router;

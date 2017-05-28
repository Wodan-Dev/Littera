/**
 * Created by jonathan on 26/04/17.
 */
'use strict';
/**
 * Module users
 */

/**
 * Dependencies
 */

const core = require('../../core');
const libraryModel = require('../../../models/users/library.model');
const usersModel = require('../../../models/users/users.model');
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
  let pageNum = utils.normalizeNumber(req.query.page || 1, 1);
  let username = req.params.username || '-';

  libraryModel.listByUser(username, pageNum)
    .then(function (result) {
      http.render(res, result.library);
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
      let book = {
        _id: user._id,
        _id_book: id
      };

      return libraryModel.findById(book);
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

  let _id = req.body._id_user || '';
  let book = {
    date_saved: date.getDateUTC().toString(),
    _id_book: req.body._id_book,
    favorite: (req.body.favorite || '0').toString(),
    visible: (req.body.visible || '0').toString()
  };

  validator.validateId(_id)
    .then(function (rId) {
      _id = rId;
      console.log('1');
      return libraryModel.validateCreate(book);
    })
    .then(function (result) {
      console.log('2');
      console.log(result);
      return libraryModel.insert(_id, result.value);
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, book, err);
    });
}

/**
 * Method Put in route /
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function put(req, res) {

  let _id = req.body._id_user || '';
  let book = {
    date_saved: date.getDateUTC().toString(),
    _id: req.body._id_library || '',
    _id_book: req.body._id_book,
    favorite: (req.body.favorite || '0').toString(),
    visible: (req.body.visible || '0').toString()
  };


  validator.validateId(_id)
    .then(function (rId) {
      _id = rId;
      return validator.validateId(book._id);
    })
    .then(function (rId) {
      book._id = rId;
      return libraryModel.validateUpdate(book);
    })
    .then(function (result) {
      return libraryModel.update(_id, result.value);
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, book, err);
    });
}

/**
 * Method Delete in route /:id
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function remove(req, res) {
  let username = req.params.username || '';
  let book = {
    _id_book: req.params.id || ''
  };

  validator.validateId(book._id_book)
    .then(function (rId) {
      book._id_book = rId;
      return usersModel.findByUserName(username);
    })
    .then(function (user) {
      book._id = user._id;
      return libraryModel.remove(book);
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, book, err);
    });
}

/**
 * Method Get in route /:id
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function getLibraryInfo(req, res) {

  let username = req.params.username || '';

  libraryModel.listLibraryInfo(username)
    .then(function (result) {
      http.render(res, result.library);
    })
    .catch(function (err) {
      renderError(res, username, err);
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

  routes.get('/:username/library/', auth, get);
  routes.get('/:username/library/:id', auth, getById);
  routes.get('/:username/libraryinfo/', auth, getLibraryInfo);
  routes.post('/:username/library/', auth, post);
  routes.put('/:username/library/', auth, put);
  routes.delete('/:username/library/:id', auth, remove);

  return routes;
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = router;

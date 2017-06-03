/**
 * Created by jonathan on 02/03/17.
 */
'use strict';
/**
 * Module users
 */

/**
 * Dependencies
 */
const core = require('../../core');
const usersModel = require('../../../models/users/users.model');
const usersCtrl = require('../controller/users.controller');
const http = core.http;
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
  usersModel.list(pageNum)
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, {}, err);
    });
}

/**
 * Method Get in route /:username
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function getByUserName(req, res) {
  let username = req.params.username || '-';
  usersModel.findByUserName(username, true)
    .then(function (user) {
      if (user) {
        http.render(res, {
          _id: user._id ,
          name: user.name ,
          username: user.username ,
          email: user.email ,
          written_books: user.written_books ,
          library: user.library ,
          wishlist: user.wishlist ,
          following: user.following ,
          followers: user.followers ,
          choices: user.choices ,
          reviews: user.reviews ,
          acepted_terms: user.acepted_terms,
          average_stars: user.average_stars,
          gender: user.gender ,
          dob: user.dob ,
          cover_image: user.cover_image
        });
      }
      else
        throw 404;
    })
    .catch(function (err) {
      renderError(res, err, err);
    });
}



/**
 * Method Get in route /:id
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function getById(req, res) {
  let id = req.params.id;

  usersModel.validateId(id)
    .then(usersModel.findById)
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

  let user = {
    name: req.body.name || '',
    username: req.body.username || '',
    email: req.body.email || '',
    password: req.body.password || '',
    passwordbis: req.body.passwordbis || '',
    acepted_terms: (req.body.acepted_terms || 0).toString()
  };

  usersModel.validateCreate(user)
    .then(function (result) {
      return usersCtrl.validateUserName(result.value);
    })
    .then(function (result) {
      return usersCtrl.validateEmail(result);
    })
    .then(function (result) {
      return usersCtrl.validatePassword(result);
    })
    .then(function (result) {
      return usersModel.insert(result);
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, user, err);
    });
}

/**
 * Method Put in route /
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function put(req, res) {

  let user = {
    _id: req.body._id || '',
    name: req.body.name || '',
    gender: (req.body.gender || '0').toString(),
    dob: (req.body.dob || '').toString(),
    average_stars: (req.body.average_stars || '0').toString(),
    acepted_terms: (req.body.acepted_terms || '0').toString(),
    cover_image: req.body.cover_image || '',
    payment: req.body.payment || '',
    choices: req.body.choices || []
  };

  usersModel.validateUpdate(user)
    .then(function (ruser) {
      return usersModel.update(ruser.value._id, ruser.value);
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, user, err);
    });
}

/**
 * Method Delete in route /:id
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function remove(req, res) {
  http.render(res, 'Not Allowed',
    http.HTTP_STATUS.HTTP_405_METHOD_NOT_ALLOWED);
}

/**
 * Method Post in route /block
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function postBlock(req, res) {
  let user = {
    _id: req.body._id || '',
  };

  validator.validateId(user._id)
    .then(function (rId) {
      return usersModel.updateStatus(user._id, false);
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, user, err);
    });
}

/**
 * Method Post in route /unlock
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function postUnlock(req, res) {
  let user = {
    _id: req.body._id || '',
  };

  validator.validateId(user._id)
    .then(function (rId) {
      return usersModel.updateStatus(user._id, true);
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, user, err);
    });
}

/**
 * Create Instance to router object
 * @param  {Object} express Express
 * @return {Router}         router object with the routes
 */
function router(express, auth) {
  let routes = express.Router();

  routes.get('/', auth, get);
  routes.get('/:username', getByUserName);
  routes.get('/:id', auth, getById);
  routes.post('/', post);
  routes.post('/block', postBlock);
  routes.post('/unlock', postUnlock);
  routes.put('/', auth, put);
  routes.delete('/:id', auth, remove);

  return routes;
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = router;

/**
 * Created by jonathan on 06/03/17.
 */
'use strict';
/**
 * Module users
 */

/**
 * Dependencies
 */

const core = require('../../core');
const reviewsModel = require('../../../models/users/reviews.model');
const usersModel = require('../../../models/users/users.model');
const http = core.http;
const utils = core.utils;
const date = core.date;
const renderError = core.http.renderError;

/**
 * Method Get in route /
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function get(req, res) {
  let pageNum = utils.normalizeNumber(req.query.page || 1, 1);
  let username = req.params.username || '-';

  reviewsModel.listByUser(username, pageNum)
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      console.log(err);
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

  usersModel.validateId(id)
    .then(function (rId) {
      id = rId;
      return usersModel.findByUserName(username);
    })
    .then(function (user) {
      let review = {
        _id: user._id,
        _idReview: id
      };

      return reviewsModel.listByUser(review._id, review);
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

  let review = {
    _id: req.body._id,
    _id_user: req.body._id_user || '',
    stars: req.body.stars || '0',
    comment: req.body.comment || ''
  };

  reviewsModel.validateId(review._id)
    .then(function (rId) {
      review._id = rId;
      reviewsModel.validateId(review._id_user);
    })
    .then(function (rId) {
      review._id_user = rId;
      return reviewsModel.validateCreate(review);
    })
    .then(function (result) {
      console.log('result');
      return reviewsModel.insert(result.value);
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, review, err);
    });
}

/**
 * Method Put in route /
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function put(req, res) {

  let review = {
    _id: req.body._id || '',
    _id_user: req.body._id_user || '',
    stars: req.body.stars || '0',
    comment: req.body.comment || ''
  };

  reviewsModel.validateId(review._id_user)
    .then(function (rId) {
      review._id_user = rId;
      return reviewsModel.validateId(review._id);
    })
    .then(function (rId) {
      review._id = rId;
      return reviewsModel.validateCreate(review);
    })
    .then(function (result) {
      return reviewsModel.insert(result.value);
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, review, err);
    });
}

/**
 * Method Delete in route /:id
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function remove(req, res) {
  let username = req.params.username || '';
  let review = {
    _idReview: req.params.id || ''
  };

  reviewsModel.validateId(review._idReview)
    .then(function (rId) {
      review._idReview = rId;
      return usersModel.findByUserName(username);
    })
    .then(function (user) {
      review._id = user._id;
      return reviewsModel.remove(review);
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, review, err);
    });


}

/**
 * Create Instance to router object
 * @param  {Object} express Express
 * @return {Router}         router object with the routes
 */
function router(express, auth) {
  let routes = express.Router();

  routes.get('/:username/reviews/', auth, get);
  routes.get('/:username/reviews/:id', auth, getById);
  routes.post('/:username/reviews/', post);
  routes.put('/:username/reviews/', auth, put);
  routes.delete('/:username/:id', auth, remove);

  return routes;
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = router;

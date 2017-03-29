/**
 * Created by jonathan on 29/03/17.
 */
'use strict';
/**
 * Module feed
 */

/**
 * Dependencies
 */
const core = require('../../core');
const feedsModel = require('../../../models/feeds/feed.model');
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
  feedsModel.list(pageNum)
    .then(function (result) {
      http.render(res, result);
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
function getByFeedId(req, res) {
  let id = req.params.id;

  validator.validateId(id)
    .then(function (rid) {
      return feedsModel.findById(rid);
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

  let feedItem = {
    _id_user: req.body._id_user || '',
    _id_book: req.body._id_book || '',
    type_feed: req.body.type_feed || '0'
  };
  console.log('feedItem');
  console.log(feedItem);
  feedsModel.validateCreate(feedItem)
    .then(function (result) {
      console.log('result');
      console.log(result);

      return feedsModel.insert(result.value);
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, feedItem, err);
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
 * Create Instance to router object
 * @param  {Object} express Express
 * @param  {Function} auth authentication function
 * @return {Router}         router object with the routes
 */
function router(express, auth) {
  let routes = express.Router();

  routes.get('/', auth, get);
  routes.get('/:id', auth, getByFeedId);
  routes.post('/', auth, post);
  routes.delete('/:id', auth, remove);

  return routes;
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = router;

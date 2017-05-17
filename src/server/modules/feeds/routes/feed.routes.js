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
 * Method Get in route /:username
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function getByUserName(req, res) {
  let username = req.params.username;
  let pageNum = utils.normalizeNumber(req.query.page || 1, 1);

  feedsModel.listFeed(username, pageNum)
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, {}, err);
    });
}

/**
 * Create Instance to router object
 * @param  {Object} express Express
 * @param  {Function} auth authentication function
 * @return {Router}         router object with the routes
 */
function router(express, auth) {
  let routes = express.Router();

  routes.get('/:username', auth, getByUserName);

  return routes;
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = router;

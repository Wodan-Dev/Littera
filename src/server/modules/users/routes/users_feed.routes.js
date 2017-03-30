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
const usersModel = require('../../../models/users/users.model');
const feedModel = require('../../../models/feeds/feed.model');
const http = core.http;
const validator = core.validator;
const utils = core.utils;
const db = core.connection;
const renderError = core.http.renderError;

/**
 * Method Get in route /:id
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function getByUserName(req, res) {
  let username = req.params.username || '-';
  let pageNum = utils.normalizeNumber(req.query.page || 1, 1);
  usersModel.findByUserName(username)
    .then(function (user) {
      let follows = [];

      user.following.map(function (item) {
        follows.push(db.getObjectId(item._id_user_follow.toString()));
      });


      return feedModel.findByUser(follows, pageNum);
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

  routes.get('/:username/feed/', auth, getByUserName);

  return routes;
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = router;


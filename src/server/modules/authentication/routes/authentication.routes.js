'use strict';
/**
 * Module authentication
 */

/**
 * Dependencies
 */
const core = require('../../core');
const authCtrl = require('../controller/authentication.controller');
const http = core.http;
const auth = core.authentication;
const renderError = core.http.renderError;

/**
 * Method Get in route /
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 * @param  {Function} next next operation
 */
function get(req, res) {

  auth.getUserSession(req)
    .then(function (user) {
      res.json({
        'name': user.value
      });
    })
    .catch(function (err) {
      res.json({
        'err': err
      });
    });
}

/**
 * Method Post in route /authenticate
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function postAuth(req, res) {
  let user = {
    username: req.body.username || '',
    email: req.body.email || '',
    password: req.body.password || ''
  };

  authCtrl.validateUser(user)
    .then(function(ruser) {
      return authCtrl.loadUser(ruser.value);
    })
    .then(function(ruser) {
      return authCtrl.validatePassword(ruser.value, user.password);
    })
    .then(function(ruser) {

      return auth.authenticate({
        _id: ruser.value._id,
        username: ruser.value.username,
        email: ruser.value.email
      });
    })
    .then(function(ruser) {
      http.render(res, ruser);
    })
    .catch(function(err) {
      renderError(res, user, err, http.HTTP_STATUS.HTTP_400_BAD_REQUEST);
    });
}

/**
* Create Instance to router object
* @param  {Object} express Express
* @return {Router}         router object with the routes
*/
function router(express) {
  let routes = express.Router();

  routes.post('/authenticate', postAuth);
  routes.get('/me', get);

  return routes;
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = router;

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
      console.log(user);
      if (user.err)
        renderError(res,
          user.value.err.err,
          user.value.err.err, http.HTTP_STATUS.HTTP_400_BAD_REQUEST);
      else
        http.render(res, user.value);
      //res.json(user.value);
    })
    .catch(function (err) {
      renderError(res, err, err, http.HTTP_STATUS.HTTP_400_BAD_REQUEST);
      /*res.json({
        'err': err
      });*/
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
        email: ruser.value.email,
        name: ruser.value.name,
        cover_image: ruser.value.cover_image,
        written_books:ruser.value.written_books,
        library: ruser.value.library,
        wishlist: ruser.value.wishlist,
        following: ruser.value.following,
        followers: ruser.value.followers,
        choices: ruser.value.choices,
        reviews: ruser.value.reviews,
        is_staff: ruser.value.is_staff,
        status: ruser.value.status,
        acepted_terms: ruser.value.acepted_terms,
        average_stars: ruser.value.average_stars,
        gender: ruser.value.gender
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

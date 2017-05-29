'use strict';
/**
 * Module authentication
 */

/**
 * Dependencies
 */
const core = require('../../core');
const authCtrl = require('../controller/authentication.controller');
const userModel = require('../../../models/users/users.model');
const http = core.http;
const auth = core.authentication;
const renderError = core.http.renderError;
const crypto = core.crypto;

/**
 * Method Get in route /
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 * @param  {Function} next next operation
 */
function get(req, res) {

  auth.getUserSession(req)
    .then(function (user) {
      if (user.err)
        throw user.value.err.err;
      else
        return userModel.findById(user.value._id);
    })
    .then(function(ruser) {
      let usr = {
        _id: ruser._id,
        username: ruser.username,
        email: ruser.email,
        name: ruser.name,
        dob: ruser.dob,
        cover_image: ruser.cover_image,
        written_books:ruser.written_books,
        library: ruser.library,
        wishlist: ruser.wishlist,
        following: ruser.following,
        followers: ruser.followers,
        choices: ruser.choices,
        reviews: ruser.reviews,
        is_staff: ruser.is_staff,
        status: ruser.status,
        acepted_terms: ruser.acepted_terms,
        average_stars: ruser.average_stars,
        gender: ruser.gender,
        payment: ruser.payment
      };

      http.render(res, usr);
    })
    .catch(function (err) {
      renderError(res, err, err, http.HTTP_STATUS.HTTP_401_UNAUTHORIZED);
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
        dob: ruser.value.dob,
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

function changePass(req, res) {
  let user = {
    email: req.body.email || '',
    username: req.body.username || '',
    password: req.body.password || '',
    newPass: req.body.newPass || '',
    newPassBis: req.body.newPassBis || ''
  };

  let userLoad = {};

  userModel.findByUserName(user.username)
    .then(function (result) {
      userLoad = result;
      return userModel.findByUserEmail(user.email);
    })
    .then(function (result) {
      return authCtrl.validateUser(user);
    })
    .then(function (ruser) {
      return authCtrl.validatePassword(userLoad, ruser.value.password);
    })
    .then(function (rvalid) {
      return authCtrl.validatePassBis(user);
    })
    .then(function (rvalid) {
      return crypto.encrypt(user.newPass);
    })
    .then(function (pass) {
      userLoad.password = pass;
      return userModel.update(userLoad._id, userLoad);
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
function router(express, ath) {
  let routes = express.Router();

  routes.post('/authenticate', postAuth);
  routes.get('/me', get);
  routes.post('/change', ath, changePass);

  return routes;
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = router;

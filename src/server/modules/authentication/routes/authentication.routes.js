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
const config = core.config;
const email = core.email;
const validator = core.validator;
const auth = core.authentication;
const renderError = core.http.renderError;
const crypto = core.crypto;
const uid = require('uid-safe').sync;

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
      if (!ruser.status)
        throw validator.invalidResult('username', 'Usuário está inativo');

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
      if (!ruser.value.status && ruser.value.checksum === '-')
        throw validator.invalidResult('username', 'Usuário está inativo');
      else if (!ruser.value.status && ruser.value.checksum !== '-')
        throw validator.invalidResult('username', 'Recuperação de senha iniciada para esse usuário.');

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

/**
 * Method Post in route /admin/authenticate
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function postAdmAuth(req, res) {
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
      if (!ruser.value.status && ruser.value.checksum === '-')
        throw validator.invalidResult('username', 'Usuário está inativo');
      else if (!ruser.value.status && ruser.value.checksum !== '-')
        throw validator.invalidResult('username', 'Recuperação de senha iniciada para esse usuário.');

      if (!ruser.value.is_staff)
        throw validator.invalidResult('username', 'Operação não permitida.');

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

  userModel.findByEmailAndUsername(user.username, user.email)
    .then(function (result) {
      userLoad = result;
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

function sendMail(req, res) {
  let user = {
    email: req.body.email || '',
    username: req.body.username || ''
  };

  let userLoad = {};

  userModel.validateForgot(user)
    .then(function (usr) {
      user = usr.value;
      return userModel.findByEmailAndUsername(user.username, user.email);
    })
    .then(function (ruser) {
      ruser.checksum = ruser.username + uid(24);
      ruser.status = false;
      userLoad = ruser;
      return userModel.update(userLoad._id, userLoad);
    })
    .then(function (result) {
      return email.sendPlainEmail(
        config.getEmailAuthUser(),
        userLoad.email,
        'Recuperação de senha',
        'Recupere sua seha através do link: http://'+
        config.getDomain() + '/#/mordor/recover/'+ userLoad.checksum);
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, user, err);
    });
}

function postRecover(req, res) {
  let user = {
    email: req.body.email || '',
    username: req.body.username || '',
    checksum: req.body.checksum || '',
    password: req.body.password || '',
    passwordbis: req.body.passwordbis || ''
  };

  let userLoad = {};

  userModel.validateRecover(user)
    .then(function (usr) {
      user = usr.value;
      return userModel.findRecover(user);
    })
    .then(function (ruser) {
      userLoad = ruser;
      return authCtrl.validatePassRecover(user);
    })
    .then(function (ruser) {
      return crypto.encrypt(user.password);
    })
    .then(function (pass) {
      userLoad.password = pass;
      userLoad.checksum = '-';
      userLoad.status = true;
      return userModel.update(userLoad._id, userLoad);
    })
    .then(function (result) {
      email.sendPlainEmail(
        config.getEmailAuthUser(),
        userLoad.email,
        'Recuperação de senha',
        'Senha atualizada com sucesso. http://'+
        config.getDomain() + '/#/mordor/login/');
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
  routes.post('/admin/authenticate', postAdmAuth);
  routes.get('/me', get);
  routes.post('/change', ath, changePass);
  routes.post('/forgot', sendMail);
  routes.post('/recover', postRecover);


  return routes;
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = router;

/**
 * Created by jonathan on 07/05/17.
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
const businessModel = require('../../../models/users/business.model');
const http = core.http;
const utils = core.utils;
const validator = core.validator;
const renderError = core.http.renderError;

/**
 * Method Get in route /
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function getSalesPerformance(req, res) {

  let username = req.params.username || '-';

  usersModel.findByUserName(username)
    .then(function (user) {
      return businessModel.getSalesPerformance(user._id);
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, {}, err);
    });
}

function getSalesProfit(req, res) {

  let username = req.params.username || '-';

  usersModel.findByUserName(username)
    .then(function (user) {
      return businessModel.getBooksValue(user._id);
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, {}, err);
    });
}

function getTotalProfit(req, res) {

  let username = req.params.username || '-';

  usersModel.findByUserName(username)
    .then(function (user) {
      return businessModel.getBooksTotalByMonth(user._id);
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, {}, err);
    });
}

function getTotalBookCount(req, res) {

  let username = req.params.username || '-';
  let idBook = req.params.idBook || '-';

  usersModel.findByUserName(username)
    .then(function (user) {
      return businessModel.getBooksSalesByMonth(user._id, idBook);
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, {}, err);
    });
}

function getTopSales(req, res) {
  let limitTopUser = utils.normalizeNumber(req.query.topuser || 4, 4);
  let limitTopSale = utils.normalizeNumber(req.query.topsale || 3, 3);


  let userSales = {};
  businessModel.getTopUserSales(limitTopUser)
    .then(function (user) {
      userSales = user;
      return businessModel.getTopBooksSales(limitTopSale);
    })
    .then(function (bookSales) {

      http.render(res, {
        users: userSales,
        books: bookSales
      });
    })
    .catch(function (err) {
      renderError(res, {}, err);
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

  routes.get('/:username/sales/performance/', auth, getSalesPerformance);
  routes.get('/:username/sales/profit/', auth, getSalesProfit);
  routes.get('/:username/sales/total/', auth, getTotalProfit);
  routes.get('/:username/sales/books/:idBook', auth, getTotalBookCount);
  routes.get('/top/trends/', getTopSales);


  return routes;
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = router;

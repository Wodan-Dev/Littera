'use strict';
/**
 * Module authentication
 */

/**
 * Dependencies
 */
const core = require('../../core');
const usersModel = require('../../../models/users/users.model');
const booksModel = require('../../../models/books/books.model');
const salesModel = require('../../../models/sales/sales.model');
const http = core.http;
const utils = core.utils;
const date = core.date;
const renderError = core.http.renderError;

/**
 * Method Get in route /dashboard
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function getDashBoard(req, res) {
  Promise.all([
    usersModel.getCountAll(),
    booksModel.getCountAll(),
    salesModel.getCountAll(),
    salesModel.getTotalBilled(),
    usersModel.getAverageInfo(),
    booksModel.getAverageInfo()
  ])
    .then(function (result) {
      http.render(res, {
        users:{
          count: result[0],
          info: result[4]
        },
        books: {
          count: result[1],
          info: result[5],
        },
        sales: result[2],
        profit: result[3]
      });
    })
    .catch(function (err) {
      renderError(res, {}, err);
    });




  /*let pageNum = utils.normalizeNumber(req.query.page || 1, 1);
  usersModel.list(pageNum)
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, {}, err);
    });*/
}

/**
 * Create Instance to router object
 * @param  {Object} express Express
 * @return {Router}         router object with the routes
 */
function router(express, auth) {
  let routes = express.Router();

  routes.get('/dashboard', auth, getDashBoard);

  return routes;
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = router;

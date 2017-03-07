'use strict';
/**
 * Module Sales
 */

/**
 * Dependencies
 */
const core = require('../../core');
const salesModel = require('../../../models/sales/sales.model');
const salesCtrl = require('../controller/sales.controller');
const http = core.http;
const date = core.date;
const utils = core.utils;
const renderError = core.http.renderError;

/**
 * Method Get in route /
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function get(req, res) {
  let pageNum = utils.normalizeNumber(req.query.page || 1, 1);
  salesModel.list(pageNum)
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
function getByUserId(req, res) {
  let id = req.params.id;
  let pageNum = utils.normalizeNumber(req.query.page || 1, 1);

  salesModel.validateId(id)
    .then(function (rid) {
      return salesModel.findByUserId(rid, pageNum);
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, {}, err);
    });
}



/**
 * Method Post in route /books
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function postBook(req, res) {
  let _id_sale = req.body._id_sale || '';

  let saleItem = {
    _id_book: req.body._id_book || '',
    value: (req.body.value || '0').toString()
  };

  salesModel.validateId(_id_sale)
    .then(function (rIdSale) {
      _id_sale = rIdSale;
      return salesModel.validateId(saleItem._id_book);
    })
    .then(function (rIdBook) {
      saleItem._id_book = rIdBook;
      return salesModel.validateItemCreate(saleItem);
    })
    .then(function (result) {
      return salesModel.insertItem(_id_sale, result.value);
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, saleItem, err);
    });
}

/**
 * Method Put in route /books
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function putBook(req, res) {
  let saleItem = {
    _id: req.body._id || '',
    _idItem: req.body._idItem || '',
    value: (req.body.value || '0').toString()
  };

  salesModel.validateId(saleItem._id)
    .then(function (rIdSale) {
      saleItem._id = rIdSale;
      return salesModel.validateId(saleItem._idItem);
    })
    .then(function (rIdItem) {
      saleItem._idItem = rIdItem;

      return salesModel.updateItem(saleItem);
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, saleItem, err);
    });
}

/**
 * Method Post in route /
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function post(req, res) {

  let sale = {
    _id_user: req.body._id_user || '',
    transaction_id: '-',
    status: req.body.status || '0',
    items: req.body.items || []
  };

  salesModel.validateCreate(sale)
    .then(function (rSale) {
      return salesCtrl.generateTransactionId(rSale.value);
    })
    .then(function (result) {
      return salesModel.insert(result);
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, sale, err);
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
 * Method Delete in route /:id/books/:idBook
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function removeBook(req, res) {
  let saleItem = {
    _id: req.params.id || '',
    _idItem: req.params.idBook || ''
  };

  salesModel.validateId(saleItem._id)
    .then(function (rIdSale) {
      saleItem._id = rIdSale;
      return salesModel.validateId(saleItem._idItem);
    })
    .then(function (rIdItem) {
      saleItem._idItem = rIdItem;

      return salesModel.removeItem(saleItem);
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, saleItem, err);
    });
}

/**
 * Create Instance to router object
 * @param  {Object} express Express
 * @return {Router}         router object with the routes
 */
function router(express, auth) {
  let routes = express.Router();

  routes.get('/', auth, get);
  routes.get('/:id', auth, getByUserId);
  routes.post('/', auth, post);
  routes.post('/books', auth, postBook);
  routes.put('/books', auth, putBook);
  routes.delete('/:id', auth, remove);
  routes.delete('/:id/books/:idBook', auth, removeBook);

  return routes;
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = router;

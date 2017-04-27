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
const libraryModel = require('../../../models/users/library.model');
const http = core.http;
const utils = core.utils;
const renderError = core.http.renderError;
const validator = core.validator;
const paypal = core.paypal;

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
 * Method Get in route /user/:id
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function getLastSale(req, res) {
  let id = req.params.id;

  salesModel.validateId(id)
    .then(function (rid) {
      return salesModel.getLastSale(rid);
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
    _id_user: req.body._id_user || '',
    value: (req.body.value || '0').toString()
  };

  salesModel.validateId(_id_sale)
    .then(function (rIdSale) {
      _id_sale = rIdSale;
      return salesModel.validateId(saleItem._id_book);
    })
    .then(function (rIdBook) {
      saleItem._id_book = rIdBook;
      return salesCtrl.validateBook(_id_sale, saleItem._id_book, saleItem._id_user);
    })
    .then(function () {
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
    status: (req.body.status || '0').toString(),
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


function finalize(req, res) {
  let sale = {
    _id: req.params.id || ''
  };

  let saleItem = {};
  let books = [];

  salesModel.validateId(sale._id)
    .then(function (rIdSale) {
      sale._id = rIdSale;
      return salesModel.findById(sale._id);
    })
    .then(function (result) {
      saleItem = result;

      for (var i = 0, len = saleItem.items.length; i < len; i++) {
        books.push({
          _id_book: saleItem.items[i]._id_book,
          favorite: 0,
          visible: 0
        });
      }

      return libraryModel.insert(saleItem._id_user, books, true);
    })
    .then(function () {
      return salesModel.update(sale._id, {
        _id_user: saleItem._id_user,
        transaction_id: saleItem.transaction_id,
        status: 2,
        items: saleItem.items
      });
    })
    .then(function (result) {
      http.render(res, result);
    })
    .catch(function (err) {
      renderError(res, saleItem, err);
    });
}

/**
 * Method Pay in route /pay
 * Call Paypal API to post a payment
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function pay(req, res) {

  let _id_sale = req.body._id_sale;

  let paypal_sale = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal'
    },
    transactions: [],
    note_to_payer: 'Em caso de dúvidas, contate o suporte do Littera.',
    redirect_urls: {
      return_url: 'www.littera.pub/purchases',
      cancel_url: 'www.littera.pub/cart'
    }
  };

  validator.validateId(_id_sale)
    .then(function(rId) {
      _id_sale = rId;
      return salesModel.getSale(_id_sale);
    })
    .then(function (result) {
      return new Promise(function (resolve, reject) {
        let obj = {
          amount: {
            total: result[0].totalsale,
            currency: 'BRL'
          },
          description: 'Compra de E-books no site Littera.',
          custom: 'Cod. Venda: ' + _id_sale,
          payment_options: {
            allowed_payment_method: 'INSTANT_FUNDING_SOURCE'
          },
          soft_descriptor: 'Littera Ebooks',
          item_list: {
            items: []
          }
        };

        for (let items of result[0].items) {
          obj.item_list.items.push({
            name: items.title,
            description: items.synopsis,
            quantity: '1',
            price: items.value,
            tax: 0,
            currency: 'BRL'
          });
        }

        paypal_sale.transactions.push(obj);

        paypal.payment.create(paypal_sale, function (error, payment) {
          if (error)
            reject(validator.createErrItem('paypal', error));
          else
            resolve(payment);
        });
      });
    })
    .then(function (payment) {
      http.render(res, payment);
    })
    .catch(function(err) {
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

  routes.get('/', auth, get);
  routes.get('/:id', auth, getByUserId);
  routes.get('/user/:id', auth, getLastSale);
  routes.post('/', auth, post);
  routes.post('/pay', pay);
  routes.post('/:id/finalize', finalize);
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

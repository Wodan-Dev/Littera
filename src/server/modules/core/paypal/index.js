'use strict';

const paypal = require('paypal-rest-sdk');
const config = require('../config');

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': config.getPaypalAppId(),
  'client_secret': config.getPayPalAppSecret()
});

module.exports = paypal;

/**
 * Created by jonathan on 29/05/17.
 */
'use strict';
/**
 * Module email
 */

/**
 * Dependencies
 */
const nodemailer = require('nodemailer');
const config = require('../config');
const validator = require('../validator');

function getMailTransporter() {
  return {
    host: config.getEmailService(), // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: config.getEmailPort(), // port for secure SMTP
    tls: {
      ciphers:'SSLv3'
    },
    auth: {
      user: config.getEmailAuthUser(),
      pass: config.getEmailAuthPass()
    }
  };
}

function sendPlainEmail(pFrom, pTo, pSubject, pText) {
  return new Promise(function (resolve, reject) {
    let mailOptions = {
      from: pFrom,
      to: pTo,
      subject: pSubject,
      text: pText
    };

    let transporter = nodemailer.createTransport(getMailTransporter());

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        let errmsg = validator.createErrItem('email', err);
        reject(validator.invalidResult('email', errmsg));
      }
      else {
        resolve(info);
      }
    });
  });
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  sendPlainEmail: sendPlainEmail
};

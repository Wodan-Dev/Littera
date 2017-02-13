'use strict';
/**
 * Module tests
 */

/**
 * Dependencies
 */
const frisby = require('frisby');
const options = {
  request: {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': 'a'
    }
  }
};

function getRandom(limit) {
  return Math.floor((Math.random() * limit));
};

frisby.globalSetup(options);

module.exports = {
  frisby: frisby,
  base_url: "http://localhost:3000/",
  getRandom: getRandom
};

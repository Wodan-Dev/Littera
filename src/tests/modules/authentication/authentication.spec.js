'use strict';
/**
 * Module tests
 */

/**
 * Dependencies
 */
const fs = require('fs');
const config = require('../../config.test');
const url = config.base_url + 'mordor/users';

const usersFake = JSON.parse(fs.readFileSync('./tests/data/users.json', 'utf8'));

config.frisby.create('create user')
  .post(url, {
    username: usersFake[config.getRandom(50)].username,
    email: usersFake[config.getRandom(50)].email,
    password: '12345678',
    passwordbis: '12345678',
  }, { json: true })
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSONTypes({
      success: Boolean,
      data: Object
  })
  .toss();

//587bcdd4115a71368e10fe07

config.frisby.create('return user')
    .get(url + '/587bcdd4115a71368e10fe07')
    .expectStatus(404)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
      "status": 200,
      "success": true,
      "data": {
        "_id": "587bcdd4115a71368e10fe07",
        "username": "cwallacee",
        "email": "llarson18@gnu.org",
        "password": "$2a$14$eInNIA6wQtAVyrmN5JIGO.vA7poDBdk7q0dHEaa94SjbDeuwnt9UG",
        "__v": 0,
        "checksum": "ooooo",
        "is_staff": false,
        "active": true,
        "modified_at": "2017-01-15T19:30:28.396Z",
        "create_at": "2017-01-15T19:28:50.752Z"
      }
    })
    .expectJSONTypes({
      status: Number,
      success: Boolean,
      data: Object
    })
    .toss();

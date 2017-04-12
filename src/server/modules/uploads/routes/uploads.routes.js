/**
 * Created by jonathan on 10/04/17.
 */
'use strict';
/**
 * Module uploads.routes
 */

/**
 * Dependencies
 */
const core = require('../../core');
const fs = require('fs');
const multer = require('multer');
const config = core.config;
const utils = core.utils;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let basePath = config.getUploadPath() + '/users/' + req.params.username;
    console.log('basePath');
    console.log(basePath);
    fs.mkdir(basePath, function(err) {
      console.log('err');
      console.log(err);

      cb(null, basePath);
    });
  },
  filename: function (req, file, cb) {
    cb(null, 'cover.png');
  }
});

//const upload = multer({ storage: storage }).single('image');

/**
 * Method Get in route /users/:username/:file
 * @param  {Object}   req  request object
 * @param  {Object}   res  response object
 */
function getUserPic(req, res) {

  let basePath = config.getUploadPath() + '/users/' + req.params.username;

  res.writeHead(200, { 'Content-Type': 'image/png' });

  fs.readFile(basePath + '/cover.png', function (err, data) {
    let img = null;
    if (err)
      img = fs.readFileSync(config.getUploadPath() + '/no-image.png');
    else
      img = data;
    res.end(img, 'binary');
  });
}

function postUserPic(req, res) {

  res.status(200).end();

}


/**
 * Create Instance to router object
 * @param  {Object} express Express
 * @return {Router}         router object with the routes
 */
function router(express, auth) {
  let routes = express.Router();

  routes.get('/users/:username', /*auth, */getUserPic);
  routes.post('/users/:username',
    multer({ storage: storage }).single('image'), auth, postUserPic);
  /*routes.get('/:id', auth, getById);
  routes.post('/', auth, post);
  routes.put('/', auth, put);
  routes.delete('/:id', auth, remove);*/

  return routes;
}

/**
 * Module Export
 * @type {Object}
 */
module.exports = router;


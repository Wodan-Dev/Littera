'use strict';
/**
 * Module authentication
 */


/**
 * Dependencies
 */
const core = require('../../core');
const db = core.connection;
const date = core.date;
const models = core.validator.models;
const schema = core.validator.schema;

/**
 * Users Schema Definition
 * @type {Schema}
 */
const usersSchema = new db.mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    bcrypt: true
  },
  last_login: {
    type: Date
  },
  create_at: {
    type: Date,
    required: true,
    default: date.getDateUTC()
  },
  modified_at: {
    type: Date,
    required: true,
    default: date.getDateUTC()
  },
  status: {
    type: Boolean,
    required: true,
    default: true
  },
  is_staff: {
    type: Boolean,
    required: true,
    default: false
  },
  checksum: {
    type: String,
    required: true,
    default: '-'
  }
});
/*
function preUpdate(model, next) {
  model.modified_at = date.getDateUTC();

  crypto.encrypt(model.password)
    .then(function (hash) {
      model.password = hash;
      next();
    })
    .catch(function (err) {
      next(err);
    });

  next();
}*/

/**
 * Before save new object
*/
/*usersSchema.pre('save', function (next) {
  this.create_at = date.getDateUTC();

  preUpdate(this, next);
});

usersSchema.pre('findOneAndUpdate', function (next) {
  let model = this._update;

  model.modified_at = date.getDateUTC();

  preUpdate(model, next);
});

usersSchema.pre('update', function (next) {
  let model = this._update.$set;
  model.modified_at = date.getDateUTC();

  preUpdate(model, next);
});*/

usersSchema.post('save', function (doc, next) {
  next();
});

usersSchema.plugin(db.mongoosePaginate);

/**
 * Users Schema create validation
 * @type {Object}
 */
const usersCreateSchema = schema({
  username: models.stringField(true).min(5).max(30),
  email: models.stringField(true).email(),
  password: models.stringField(true).min(8),
  passwordbis: models.stringField(true).min(8)
});

/**
 * Users Schema update validation
 * @type {Object}
 */
const usersUpdateSchema = schema({
  _id: models.stringField(true),
  password: models.stringField(true),
  last_login: models.dateField(true)
});

/**
 * Module Export
 * @type {Object}
 */
module.exports = {
  usersSchema: usersSchema,
  usersCreateSchema: usersCreateSchema,
  usersUpdateSchema: usersUpdateSchema
};

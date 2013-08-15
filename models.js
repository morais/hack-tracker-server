var mongoose = require('mongoose'),
  Hack;

function defineModels(mongoose, fn) {
  var Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

  Hack = new Schema({
    'title': { type: String, index: true },
    'description': String,
    'tags':  [String],
    'keywords': [String],
    'owner_id': ObjectId
  });

  Hack.virtual('id')
    .get(function() {
      return this._id.toHexString();
    });

  mongoose.model('Hack', Hack);
  fn();
}

exports.defineModels = defineModels;
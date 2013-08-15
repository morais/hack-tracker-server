var mongoose = require('mongoose'),
  Hack;

function defineModels(mongoose, fn) {
  var Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;

  User = new Schema({
    'name': String
  });

  User.virtual('id')
    .get(function() {
      return this._id.toHexString();
    });

  mongoose.model('User', User);

  Hack = new Schema({
    'title': { type: String, index: true },
    'description': String,
    'url':  String,
    'submission_date': Date,
    'voters': [ObjectId],
    'tags':  [String],
    'snapshots':  [String],
    'status': { type: String, index: true },
    'owner': ObjectId,
    'participants': [ObjectId]
  });

  Hack.virtual('id')
    .get(function() {
      return this._id.toHexString();
    });

  mongoose.model('Hack', Hack);
  fn();
}

exports.defineModels = defineModels;
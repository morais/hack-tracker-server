function defineModels(mongoose, fn) {
  var Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId,
      Hack,
      User;

  User = new Schema({
    'external_id': { type: Number, index: true },
    'external_system': { type: String, index: true },
    'name': String,
    'avatar_url': String
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
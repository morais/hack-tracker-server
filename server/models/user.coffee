mongoose = require "mongoose"

User = new mongoose.Schema
  external_id: {type: Number, index: true}
  external_type: { type: String, index: true}
  name: String
  avatar_url: String

User.virtual('id').get ->
  @._id.toHexString

mongoose.model 'User', User
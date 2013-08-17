mongoose = require "mongoose"
Schema   = mongoose.Schema
ObjectId = mongoose.Schema.ObjectId
validate = require('mongoose-validator').validate

presence = validate('notEmpty')

hack_schema = new Schema
  title:        { type: String, index: true, validate: presence }
  description:  { type: String, validate: presence }
  event_id:     ObjectId
  owner_id:     ObjectId
  participants: [ObjectId]
  status:       { type: String, index: true }

hack_schema.virtual('id').get ->
  @._id.toHexString

Hack = mongoose.model 'Hack', hack_schema
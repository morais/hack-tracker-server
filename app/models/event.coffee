mongoose = require "mongoose"
validate = require('mongoose-validator').validate

event_schema = new mongoose.Schema
  title: {type: String, index: true, validate: [validate('notEmpty')]}

event_schema.virtual('id').get ->
  @._id.toHexString

mongoose.model 'Event', event_schema
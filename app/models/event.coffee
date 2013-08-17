mongoose = require "mongoose"

Event = new mongoose.Schema
  title: String

Event.virtual('id').get ->
  @._id.toHexString

mongoose.model 'Event', Event
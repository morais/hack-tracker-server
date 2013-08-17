mongoose = require "mongoose"

ObjectId = mongoose.Schema.ObjectId

Hack = new mongoose.Schema(
  title: { type: String, index: true }
  description: String
  event: ObjectId
  url:  String
  submission_date: Date
  voters: [ObjectId]
  tags:  [String]
  snapshots:  [String]
  status: { type: String, index: true }
  owner: ObjectId
  participants: [ObjectId]
)

Hack.virtual('id').get ->
  @._id.toHexString

mongoose.model 'Hack', Hack
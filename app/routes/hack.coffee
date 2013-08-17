mongoose = require "mongoose"

exports.configureRoutes = (app) ->
  Hack = mongoose.model 'Hack'
  format = (o) ->
    o = o.toObject

  app.get '/hacks', (req, res) ->
    Hack.find (err, hacks) ->
      res.send 'hacks': hacks


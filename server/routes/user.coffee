mongoose = require "mongoose"

exports.configureRoutes = (app) ->

  User = mongoose.model 'User'

  app.get '/users/current', app.requireAuth, (req, res) ->
    res.send 'user': req.user

  app.get '/users', app.requireAuth, (_, res) ->
    User.find (err, users) ->
      res.send 'users': users
mongoose = require "mongoose"

exports.configureRoutes = (app) ->

  User = mongoose.model 'User'

  app.get '/user', app.requireAuth, (req, res) ->
    res.send 'user': req.user


  app.get '/users', app.requireAuth, (_, res) ->
    User.find (err, users) ->
      res.send 'users': users
mongoose = require 'mongoose'

exports.configureAuth = (app) ->
  passport = require 'passport'
  YammerStrategy = require('passport-yammer').Strategy
  url = process.env.BASE_URL || 'http://localhost:3000'
  User = mongoose.model 'User'

  strategy = new YammerStrategy({
    clientID: process.env.YAMMER_CLIENT_ID
    clientSecret: process.env.YAMMER_CLIENT_SECRET
    callbackURL: url + '/auth/yammer/callback'
  }, (accessToken, refreshToken, profile, done) ->
    User.findOne({external_id: profile.id}, (err, user) ->
      if user
        user.name = profile.displayName
        user.avatar_url = profile._json.mugshot_url
      else
        user = new User
          external_id: profile.id
          external_type: 'yammer'
          name: profile.displayName
          avatar_url: profile._json.mugshot_url

      user.save -> done(null, user)
    )
  )

  app.requireAuth = (req, res, next) ->
    return next() if req.isAuthenticated
    res.redirect '/auth/yammer'

  passport.use strategy

  passport.serializeUser (user, done) ->
    done null, user.id

  passport.deserializeUser (id, done) ->
    User.findById id, (err, user) ->
      done err, user


  app.get '/logout', app.requireAuth, (req, res) ->
    req.logout
    res.redirect '/'

  app.get '/auth/yammer', passport.authenticate('yammer')

  app.get(
    '/auth/yammer/callback'
    passport.authenticate('yammer'
    {failureRedirect: '/login'})
    (req, res) ->
      res.redirect '/'
  )
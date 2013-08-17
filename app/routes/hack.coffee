mongoose = require "mongoose"

exports.configureRoutes = (app) ->
  Hack = mongoose.model 'Hack'
  update = (object, attributes) ->
    object.set attributes
    object.save (error, success) ->
      success

  compare = (objectA, objectB) ->
    objectA.toString() == objectB.toString()

  app.get '/hacks', (req, res) ->
    Hack.find (err, hacks) ->
      res.send 'hacks': hacks

  app.post '/hacks', app.requireAuth, (req, res) ->
    hack = new Hack req.body.hack
    hack.set 'owner_id', req.user.id
    hack.save ->
      res.send 'hack': hack

  app.put '/hacks/:id', app.requireAuth, (req, res) ->
    Hack.findById req.params.id, (e, hack) ->
      return res.send 'Not found', 404 unless hack?
      if hack && compare req.user.id, hack.get('owner_id')
        update hack, req.body.hack
        res.send 'hack': hack
      else
        res.send 'Unauthorized', 400

  app.del '/hacks/:id', app.requireAuth, (req, res) ->
    # For the moment, this doesn't work - need to implement ownership
    res.send 'Not implemented', 501
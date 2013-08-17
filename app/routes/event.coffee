mongoose = require "mongoose"

exports.configureRoutes = (app) ->
  Event = mongoose.model 'Event'
  format = (o) ->
    o = o.toObject()
    title: o.title

  app.get '/events', (req, res) ->
    Event.find (err, events) ->
      res.send 'events': format e for e in events


  app.get '/events/:id', (req, res) ->
    Event.findOne {_id: req.params.id}, (err, d) ->
      if d
        res.send 'hack': format d
      else
        res.send 'Object not found', 404

  app.post '/events', app.requireAuth, (req, res) ->
    event = new Event req.body.event
    event.save ->
      res.send 'event': event

  app.put '/events/:id', app.requireAuth, (req, res) ->
    Event.findById req.params.id, (e, event) ->
      return res.send 'Not found', 404 unless event?
      event.set req.body.event
      event.save (e, s) ->
        res.send 'event': s
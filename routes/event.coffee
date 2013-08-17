exports.configureRoutes = (app) ->
  Event = app.Event
  format = (o) ->
    o = o.toObject()
    title: o.title

  app.get '/events', (req, res) ->
    Event.find (e, events) ->
      res.send 'events': format hack for hack in events


  app.get '/events/:id', (req, res) ->
    Event.findOne {_id: req.params.id}, (err, d) ->
      if d
        res.send 'hack': format d
      else
        res.send 'Object not found', 404

  app.post '/hacks', (req, res) ->
    d = new Hack req.body.hack
    d.save ->
      res.send 'hack': format d
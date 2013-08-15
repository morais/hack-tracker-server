function configureRoutes(app) {
  var Hack = app.Hack;

  // List
  app.get('/hacks.:format', function(req, res) {
    Hack.find(function (err, hacks) {
      if (req.params.format === 'json') {
        res.send(hacks.map(function(hack) { 
          var o = hack.toObject()
          return { 'title': o.title, 'id': o._id };
        }));
      } else {
        res.send('Format not supported: ' + req.params.format);
      }
    });
  });

  // Create 
  app.post('/hacks.:format?', function(req, res) {
    var d = new Hack(req.body);
    d.save(function() {
      if (req.params.format === 'json') {
        var o = d.toObject()
        res.send({ 'title': o.title, 'id': o._id });
      } else {
        res.send('Format not available', 400);
      }
    });
  });

  // Read
  app.get('/hacks/:id.:format?', function(req, res) {
   Hack.findOne({ _id: req.params.id }, function(err, d) {
      if (!d) {
        res.send('Object not found', 404);    
      } else if (req.params.format === 'json') {
        var o = d.toObject()
        res.send({ 'title': o.title, 'id': o._id });
      } else {
        res.send('Format not available', 400);
      }
    });
  });

  // Update
  app.put('/hacks/:id.:format?', function(req, res) {
    Hack.findOne({ _id: req.params.id }, function(err, d) {
      if (!d) {
        res.send('Object not found', 404);
      } else {
        d.title = req.body.title;    
        d.save(function(err) {
          var o = d.toObject()       
          res.send({ 'title': o.title, 'id': o._id });
        });
      }
    });
  });

  // Delete
  app.del('/hacks/:id.:format?', function(req, res) {
    Hack.findOne({ _id: req.params.id }, function(err, d) {
      if (!d) {
        res.send('Object not found', 404); 
      } else {
        d.remove(function() {
          res.send('true');
        });
      }
    });      
  });

}

exports.configureRoutes = configureRoutes;
function configureRoutes(app) {
  var Hack = app.Hack,
      formatObject = function (o) {
        var o = o.toObject();
        return {
          'title': o.title,
          'description': o.description,
          'url':  o.url,
          'submission_date': o.submission_date,
          'voters': o.voters,
          'tags': o.tags,
          'snapshots': o.snapshots,
          'status': o.status,
          'owner': o.owner,
          'id': o._id
        };
      };

  // List
  app.get('/hacks.:format', function(req, res) {
    Hack.find(function (err, hacks) {
      if (req.params.format === 'json') {
        var hacksList = hacks.map(function(hack) {
          return formatObject(hack);
        });
        res.send({'hacks': hacksList});
      } else {
        res.send('Format not supported: ' + req.params.format);
      }
    });
  });

  // Create
  app.post('/hacks.:format?', function(req, res) {
    var d = new Hack(req.body.hack);
    d.save(function() {
      if (req.params.format === 'json') {
        res.send({'hack': formatObject(d) });
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
        res.send({'hack': formatObject(d) });
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
        d.title = req.body.hack.title;
        d.save(function(err) {
          res.send({'hack': formatObject(d) });
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
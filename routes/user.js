function configureRoutes(app) {
  var User = app.User;
      formatObject = function (o) {
        var o = o.toObject();
        return { 
          'name': o.title, 
          'avatar_url': o.description,
          'id': o._id
        };
      };

  // Get current user
  app.get('/user.:format', function(req, res) {
    // User.find(function (err, Users) {
    //   if (req.params.format === 'json') {
    //     var UsersList = Users.map(function(User) { 
    //       return formatObject(User);
    //     });
    //     res.send({'Users': UsersList});
    //   } else {
    //     res.send('Format not supported: ' + req.params.format);
    //   }
    // });
  });

  // List
  app.get('/users.:format', function(req, res) {
    User.find(function (err, Users) {
      if (req.params.format === 'json') {
        var UsersList = Users.map(function(User) { 
          return formatObject(User);
        });
        res.send({'Users': UsersList});
      } else {
        res.send('Format not supported: ' + req.params.format);
      }
    });
  });

  // Read
  app.get('/users/:id.:format?', function(req, res) {
    User.findOne({ _id: req.params.id }, function(err, d) {
      if (!d) {
        res.send('Object not found', 404);
      } else if (req.params.format === 'json') {
        res.send(formatObject(d));
      } else {
        res.send('Format not available', 400);
      }
    });
  });

}

exports.configureRoutes = configureRoutes;
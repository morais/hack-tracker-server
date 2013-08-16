function configureRoutes(app) {
  var User = app.User,
      formatObject = function (o) {
        var o = o.toObject();
        return {
          name: o.name,
          avatar_url: o.avatar_url,
          id: o._id,
          external_id: o.external_id,
          external_type: o.external_type
        };
      };

  // Get current user
  app.get('/user.:format', app.requireJSONFormat, app.requireAuthentication, function(req, res) {
    res.send({'user': formatObject(req.user) });
  });

  // List
  app.get('/users.:format', app.requireJSONFormat, app.requireAuthentication, function(req, res) {
    User.find(function (err, Users) {
      var UsersList = Users.map(function(User) {
        return formatObject(User);
      });
      res.send({'users': UsersList});
    });
  });

  // Read
  app.get('/users/:id.:format?', app.requireJSONFormat, app.requireAuthentication, function(req, res) {
    User.findOne({ _id: req.params.id }, function(err, d) {
      if (!d) {
        res.send('Object not found', 404);
      } else {
        res.send({'user': formatObject(d) });
      }
    });
  });

}

exports.configureRoutes = configureRoutes;
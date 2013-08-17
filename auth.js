
exports.configureAuth = function(app) {
  var passport = require('passport'),
      YammerStrategy = require('passport-yammer').Strategy;

  app.requireAuthentication = function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/login')
    }
  };

  url = process.env.BASE_URL || 'http://localhost:5000';

  passport.use(new YammerStrategy({
      clientID: process.env.YAMMER_CLIENT_ID,
      clientSecret: process.env.YAMMER_CLIENT_SECRET,
      callbackURL: url + "/auth/yammer/callback"
    },
    function (accessToken, refreshToken, profile, done) {
      app.User.findOne({ external_id: profile.id, external_type: 'yammer'  }, function (err, user) {
        if (!user) {
          user = new app.User({ external_id: profile.id, external_type: 'yammer', name: profile.displayName, avatar_url: profile._json.mugshot_url });
        } else {
          user.name = profile.displayName;
          user.avatar_url = profile._json.mugshot_url;
        }
        user.save(function () { done(null, user) });
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    app.User.findOne(id, function (err, user) {
      done(err, user);
    });
  });

  app.get('/logout', app.requireAuthentication, function(req, res){
    req.logout();
    res.redirect('/');
  });

  app.get('/auth/yammer', passport.authenticate('yammer'));

  app.get('/auth/yammer/callback',
    passport.authenticate('yammer', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
    });
};
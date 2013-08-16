var express = require('express');
var mongoose = require('mongoose');
var models = require('./models');
var hack = require('./routes/hack');
var http = require('http');
var path = require('path');
var passport = require('passport');
var YammerStrategy = require('passport-yammer').Strategy;

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.session({ secret: 'cadscadscdscdscadscacsdcs' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);

// development only
//if ('development' == app.get('env')) {
  app.use(express.errorHandler());
//}

YAMMER_CLIENT_ID = ''
YAMMER_CLIENT_SECRET = ''

callbackURL = "http://127.0.0.1:" + app.get('port') + "/auth/yammer/callback";
console.log(callbackURL);

passport.use(new YammerStrategy({
    clientID: YAMMER_CLIENT_ID,
    clientSecret: YAMMER_CLIENT_SECRET,
    callbackURL: callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('COOL, AUTHENTICATED');
    console.log(profile.id);
    console.log(profile.displayName);    
    console.log(profile.mugshot_url);
    //console.log(profile);
    //User.findOrCreate({ yammerId: profile.id }, function (err, user) {
    done(profile);
    //});
  }
));

app.get('/auth/yammer/callback', 
  passport.authenticate('yammer', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/logout', ensureAuthenticated, function(req, res){
  req.logout();
  res.redirect('/');
});

app.get('/auth/yammer', passport.authenticate('yammer'));

app.get('/auth/yammer/callback', 
  passport.authenticate('yammer', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.use('/', express.static(path.join(__dirname, 'public')));

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With"); 
  next();
});

models.defineModels(mongoose, function() {
  app.Hack = mongoose.model('Hack');
  db = mongoose.connect('mongodb://localhost/hacktracker');
});

hack.configureRoutes(app);

// Start the server!
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

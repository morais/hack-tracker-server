var express = require('express');
var mongoose = require('mongoose');
var models = require('./models');
var auth = require('./auth');
var hack = require('./routes/hack');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var passport = require('passport');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.session({ secret: process.env.SESSION_SECRET || 'hacktracker' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
if (true || 'development' == app.get('env')) {
  app.use(express.errorHandler());
}

auth.configureAuth(app);

app.requireJSONFormat = function (req, res, next) {
  if (req.params.format !== 'json') {
    res.send('Format not supported: ' + req.params.format);
  } else {
    next();
  }
};

app.use('/', express.static(path.join(__dirname, 'public')));

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
  next();
});

models.defineModels(mongoose, function() {
  app.Hack = mongoose.model('Hack');
  app.User = mongoose.model('User');
  db = mongoose.connect('mongodb://localhost/hacktracker');
});

hack.configureRoutes(app);
user.configureRoutes(app);

// Start the server!
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

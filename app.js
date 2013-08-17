require('better-require')();

var express  = require('express'),
    mongoose = require('mongoose'),
    models   = require('./models'),
    auth     = require('./auth'),
    hack     = require('./routes/hack'),
    user     = require('./routes/user'),
    event    = require('./routes/event'),
    http     = require('http'),
    path     = require('path'),
    passport = require('passport'),
    newrelic = require('newrelic'),
    app      = express();

var db_uri = process.env.MONGOLAB_URI ||
             process.env.MONGOHQ_URL ||
             'mongodb://localhost/hacktracker';

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

if ('development' == app.get('env')) {
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

app.use('/', express.static(path.join(__dirname, 'client/dist/')));

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
  next();
});

models.defineModels(mongoose, function() {
  app.Hack  = mongoose.model('Hack');
  app.User  = mongoose.model('User');
  app.Event = mongoose.model('Event');
  db = mongoose.connect(db_uri);
});

hack.configureRoutes(app);
user.configureRoutes(app);
event.configureRoutes(app);

// Start the server!
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

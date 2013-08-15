var express = require('express');
var mongoose = require('mongoose');
var models = require('./models');
var hack = require('./routes/hack');
var http = require('http');
var path = require('path');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

// development only
//if ('development' == app.get('env')) {
  app.use(express.errorHandler());
//}

app.use('/', express.static(path.join(__dirname, 'public')));

models.defineModels(mongoose, function() {
  app.Hack = mongoose.model('Hack');
  db = mongoose.connect('mongodb://localhost/hacktracker');
});

hack.configureRoutes(app);

// Start the server!
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

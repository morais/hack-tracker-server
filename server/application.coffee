
# Libraries
express  = require 'express'
mongoose = require 'mongoose'
http     = require 'http'
path     = require 'path'
passport = require 'passport'
newrelic = require 'newrelic'



# Express config
app = express()

app.set 'port', process.env.PORT || 3000
app.use express.favicon()
app.use express.logger 'dev'
app.use express.cookieParser()
app.use express.bodyParser()
app.use express.methodOverride()
app.use express.session({ secret: process.env.SESSION_SECRET || 'hacktracker' })
app.use passport.initialize()
app.use passport.session()
app.use app.router

app.use express.errorHandler() if 'development' == app.get('env')



# Mongo config
mongoose.connect process.env.MONGOLAB_URI ||
                 process.env.MONGOHQ_URL ||
                 'mongodb://localhost/hacktracker'



# Models
require './models/user'
require './models/event'
require './models/hack'



# Auth
auth = require './lib/auth'
auth.configureAuth app


# Resources
for route in ['event', 'hack', 'user']
  obj = require './routes/' + route
  obj.configureRoutes(app)



# Common routes
app.use express.static path.join(__dirname, '/../client/')

app.all '/*', (req, res, next) ->
  res.header "Access-Control-Allow-Origin", "*"
  res.header "Access-Control-Allow-Headers", "X-Requested-With,Content-Type"
  next()



# Launch Node!
http.createServer(app).listen app.get('port'), ->
  console.log 'Express server listening on port ' + app.get('port')

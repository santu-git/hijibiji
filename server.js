'use strict';

// Module dependencies.
var express = require('express'),
    expressSession = require('express-session'),
    http = require('http'),
    passport = require('passport'),
    path = require('path'),
    fs = require('fs'),
    mongoStore = require('connect-mongo')(expressSession),
    errorHandler = require('express-error-handler'),
    expressLogger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    config = require('./lib/config/config');

var app = express();

// Connect to database
var db = require('./lib/db/mongo').db;

// Bootstrap models
var modelsPath = path.join(__dirname, 'lib/models');
fs.readdirSync(modelsPath).forEach(function (file) {
  require(modelsPath + '/' + file);
});

var pass = require('./lib/config/pass');

// App Configuration
//app.configure('development', function(){
  app.use(express.static(path.join(__dirname, '.tmp')));
  app.use(express.static(path.join(__dirname, 'app')));
  app.use(errorHandler());
  app.set('views', __dirname + '/app/views');
//});

/*app.configure('production', function(){
  app.use(express.favicon(path.join(__dirname, 'public', 'favicon.ico')));
  app.use(express.static(path.join(__dirname, 'public')));
  app.set('views', __dirname + '/views');
});*/

//console.log(program.args)

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(expressLogger('dev'));

// cookieParser should be above session

app.use(cookieParser());

// bodyParser should be above methodOverride
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());

// express/mongo session storage
app.use(expressSession({
  secret: 'MEAN',
  store: new mongoStore({
    url: config.db,
    collection: 'sessions'
  })
}));

// use passport session
app.use(passport.initialize());
app.use(passport.session());

//routes should be at the last
//app.use(app.router);

//Bootstrap routes
require('./lib/config/routes')(app);

// Start server
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Express server listening on port %d in %s mode', port, app.get('env'));
});
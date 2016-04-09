'use strict';

var path = require('path'),
    auth = require('../config/auth');

module.exports = function(app) {
  // User Routes
  var users = require('../controllers/users');
  app.post('/auth/users', users.create);
  app.get('/auth/users/:userId', users.show);

  // Check if username is available
  // todo: probably should be a query on users
  app.get('/auth/check_username/:username', users.exists);

  // Session Routes
  var session = require('../controllers/session');
  app.get('/auth/session', auth.ensureAuthenticated, session.session);
  app.post('/auth/session', session.login);
  app.del('/auth/session', session.logout);

  // Brand Routes
  var brands = require('../controllers/brands');
  app.get('/api/brands', brands.all);
  app.post('/api/brands', auth.ensureAuthenticated, brands.create);
  app.get('/api/brands/:brandId', brands.show);
  app.put('/api/brands/:brandId', auth.ensureAuthenticated, auth.brand.hasAuthorization, brands.update);
  app.del('/api/brands/:brandId', auth.ensureAuthenticated, auth.brand.hasAuthorization, brands.destroy);

  //Setting up the brandId param
  app.param('brandId', brands.brand);

  // Angular Routes
  app.get('/partials/*', function(req, res) {
    var requestedView = path.join('./', req.url);
    res.render(requestedView);
  });

  app.get('/*', function(req, res) {
    if(req.user) {
      res.cookie('user', JSON.stringify(req.user.user_info));
    }

    res.render('index.html');
  });

}
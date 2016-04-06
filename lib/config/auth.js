'use strict';

/**
 *  Route middleware to ensure user is authenticated.
 */
exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.send(401);
}

/**
 * Brand authorizations routing middleware
 */
exports.brand = {
  hasAuthorization: function(req, res, next) {
    if (req.brand.creator._id.toString() !== req.user._id.toString()) {
      return res.send(403);
    }
    next();
  }
};
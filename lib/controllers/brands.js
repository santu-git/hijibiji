'use strict';

var mongoose = require('mongoose'),
  Brand = mongoose.model('Brand');

/**
 * Find brand by id
 */
exports.brand = function(req, res, next, id) {
  Brand.load(id, function(err, brand) {
    if (err) return next(err);
    if (!brand) return next(new Error('Failed to load brand ' + id));
    req.brand = brand;
    next();
  });
};

/**
 * Create a brand
 */
exports.create = function(req, res) {
  var brand = new Brand(req.body);
  brand.creator = req.user;

  brand.save(function(err) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(brand);
    }
  });
};

/**
 * Update a brand
 */
exports.update = function(req, res) {
  var brand = req.brand;
  brand.title = req.body.title;
  brand.content = req.body.content;
  brand.save(function(err) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(brand);
    }
  });
};

/**
 * Delete a blog
 */
exports.destroy = function(req, res) {
  var brand = req.brand;

  brand.remove(function(err) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(brand);
    }
  });
};

/**
 * Show a blog
 */
exports.show = function(req, res) {
  res.json(req.brand);
};

/**
 * List of Blogs
 */
exports.all = function(req, res) {
  Brand.find().sort('-created').populate('creator', 'username').exec(function(err, brands) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(brands);
    }
  });
};

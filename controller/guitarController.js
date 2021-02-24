var Guitar = require('../models/Guitar')
var Category = require('../models/Category')
var Producer = require('../models/Producer')

const { body, validationResult } = require('express-validator');
var async = require('async')

//display home page
exports.index = function (req, res) {
  async.parallel({
    guitars_count: function (callback) {
      Guitar.countDocuments({}, callback)
    },
    categories_count: function (callback) {
      Category.countDocuments({}, callback)
    },
    producers_count: function (callback) {
      Producer.countDocuments({}, callback)
    }
  }, function (err, results) {
    res.render('index', { title: 'Inventory App', err, results });
  })
};

//display list of all guitars
exports.guitars = function (req, res, next) {
  Guitar.find({})
    .populate('producer')
    .populate('category')
    .exec(function (err, list_guitars) {
      if (err) { return next(err) }
      res.render('guitars', { title: 'Guitars', guitar_list: list_guitars })
    })
}

//display detail info for a specific guitar
exports.guitar_details = function (req, res, next) {
  Guitar.findById(req.params.id)
    .populate('producer')
    .populate('category')
    .exec(function (err, guitar_detail) {
      if (err) { return next(err) }
      res.render('guitar_detail', { title: 'Guitar details', guitar_detail: guitar_detail })
    })
}
//display form to create new guitar on GET
exports.guitar_create_get = function (req, res, next) {
  async.parallel({
    producers: function (callback) {
      Producer.find(callback)
    },
    categories: function (callback) {
      Category.find(callback)
    }
  }, function (err, results) {
    if (err) { return next(err) }
    res.render('guitar_add', { title: 'Guitar Add', data: results })
  })
}
//handle new guitar create on POST
exports.guitar_create_post = [
  // Validate and sanitise fields.
  body('name', 'Name must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('desc', 'Description must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('price', 'Price must not be empty.').trim().isLength({ min: 1 }).escape().toInt(),
  body('inStock', 'inStock must not be empty.').trim().isLength({ min: 1 }).escape().toInt(),
  body('category', 'category must not be empty.').escape(),
  body('producer', 'producer must not be empty.').escape(),
  // Process request after validation and sanitization.
  (req, res, next) => {

    // Extract the validation errors from a request.
    const errors = validationResult(req);

    var guitar = new Guitar({
      name: req.body.name,
      desc: req.body.desc,
      price: req.body.price,
      inStock: req.body.inStock,
      category: req.body.category,
      producer: req.body.producer
    })
    if (!errors.isEmpty()) {
      async.parallel({
        producers: function (callback) {
          Producer.find(callback)
        },
        categories: function (callback) {
          Category.find(callback)
        }
      }, function (err, results) {
        if (err) { return next(err) }
        console.log(errors.array());
        res.render('guitar_add', { title: 'Guitar Add', data: results, errors: errors.array(), guitar: guitar })
      })
      return;
    } else {
      guitar.save(function (err) {
        if (err) { return next(err) }
        res.redirect(guitar.url)
      })
    }
  }
]

var Guitar = require('../models/Guitar')
var Category = require('../models/Category')
var Producer = require('../models/Producer')

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
      console.log(guitar_detail.producer.url)
      res.render('guitar_detail', { title: 'Guitar details', guitar_detail: guitar_detail })
    })
}
//display form to create new guitar on GET
exports.guitar_create_get = function (req, res) {
  res.render('guitar_add', { title: 'Guitar Add' })
}
//handle new guitar create on POST
exports.guitar_create_post = function (req, res) {
  res.render('guitar_add', { title: 'Guitar Add' })
}
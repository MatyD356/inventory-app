var async = require('async')
var Category = require('../models/Category')
const Guitar = require('../models/Guitar')
var Producer = require('../models/Producer')
const { body, validationResult } = require('express-validator');

//display list of all producers
exports.producers = function (req, res, next) {
  Producer.find({})
    .exec(function (err, producers_list) {
      if (err) { return next(err) }
      res.render('producers', { data: producers_list })
    })
}

//display detail info for a specific producer
exports.producer_detail = function (req, res, next) {
  Producer.findById(req.params.id)
    .exec(function (err, producer_details) {
      if (err) { return next(err) }
      res.render('producers_details', { data: producer_details })
    })
}

//display form to create new category on GET
exports.category_create_get = function (req, res, next) {
  res.render('producer_add', { title: 'Add producer' })
}
//display form to create new category on POST
exports.category_create_post = [
  // Validate and sanitise fields.
  body('name', 'Name must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('desc', 'Description must not be empty.').trim().isLength({ min: 1 }).escape(),
  (req, res, next) => {

    // Extract the validation errors from a request.
    const errors = validationResult(req)

    var category = new Category({
      name: req.body.name,
      desc: req.body.desc,
    })
    if (!errors.isEmpty()) {
      res.render('category_add', { title: 'Category Add', errors: errors.array(), category: category })
    } else {
      guitar.save(function (err) {
        if (err) { return next(err) }
        res.redirect(category.url)
      })
    }
  }
]
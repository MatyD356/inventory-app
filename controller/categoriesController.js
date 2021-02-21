var Category = require('../models/Category')

var async = require('async')


exports.categories = function (req, res, next) {
  Category.find({}).exec(function (err, categories) {
    if (err) { return next(err) }
    res.render('categories', { title: 'Categories', categories })
  })
}
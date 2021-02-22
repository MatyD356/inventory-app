var Category = require('../models/Category')
const Guitar = require('../models/Guitar')

var async = require('async')


exports.categories = function (req, res, next) {
  async.parallel({
    categories: function (callback) {
      Category.find({}, callback)
    },
    electric_count: function (callback) {
      Guitar.countDocuments({ category: '603130142c82d7527adbaeb6' }, callback)
    }
  }, function (err, results) {
    if (err) { return next(err) }
    res.render('categories', { title: 'Categories', data: results })
  })
}

exports.category_details = function (req, res, next) {
  Category.findById(req.params.id)
    .exec(function (err, category_details) {
      if (err) { return (next(err)) }
      res.render('categories_detail', { data: category_details })
    })
}

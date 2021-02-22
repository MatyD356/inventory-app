var async = require('async')
var Category = require('../models/Category')
const Guitar = require('../models/Guitar')
var Producer = require('../models/Producer')


exports.producers = function (req, res, next) {
  Producer.find({})
    .exec(function (err, producers_list) {
      if (err) { return next(err) }
      res.render('producers', { data: producers_list })
    })
}

exports.producer_detail = function (req, res, next) {
  Producer.findById(req.params.id)
    .exec(function (err, producer_details) {
      if (err) { return next(err) }
      res.render('producers_details', { data: producer_details })
    })
}
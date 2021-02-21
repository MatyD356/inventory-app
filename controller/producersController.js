var async = require('async')

exports.producers = function (req, res) {
  res.render('producers', { title: 'Producers' })
}
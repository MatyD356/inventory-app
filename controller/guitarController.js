var Guitar = require('../models/Guitar')

exports.index = function (req, res) {
  res.render('index', { title: 'Inventory App' });
};

exports.guitars = function (req, res) {
  res.render('guitars', { title: 'Guitars' })
}
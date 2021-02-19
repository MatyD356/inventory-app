var Guitar = require('../models/Guitar')

//display home page
exports.index = function (req, res) {
  res.render('index', { title: 'Inventory App' });
};

//display list of all guitars
exports.guitars = function (req, res) {
  res.render('guitars', { title: 'Guitars' })
}
//display detail info for a specific guitar
exports.guitar_details = function (req, res) {
  res.render('guitar_details', { title: 'Guitar details' })
}
//display form to create new guitar on GET
exports.guitar_create_get = function (req, res) {
  res.render('guitar_add', { title: 'Guitar Add' })
}
//handle new guitar create on POST
exports.guitar_create_post = function (req, res) {
  res.render('guitar_add', { title: 'Guitar Add' })
}
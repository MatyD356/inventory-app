var express = require('express');
var router = express.Router();

var guitar_controller = require('../controller/guitarController')
var categories_controller = require('../controller/categoriesController')
var producers_controller = require('../controller/producersController')

router.get('/', guitar_controller.index);

router.get('/guitars', guitar_controller.guitars);

router.get('/categories', categories_controller.categories);

router.get('/producers', producers_controller.producers);

module.exports = router;
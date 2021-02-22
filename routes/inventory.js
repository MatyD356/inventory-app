var express = require('express');
var router = express.Router();

var guitar_controller = require('../controller/guitarController')
var categories_controller = require('../controller/categoriesController')
var producers_controller = require('../controller/producersController')

router.get('/', guitar_controller.index);

//guitars routes
router.get('/guitars', guitar_controller.guitars);
router.get('/guitars/add', guitar_controller.guitar_create_get);
router.get('/guitars/:id', guitar_controller.guitar_details);


//categories routes
router.get('/categories', categories_controller.categories);
router.get('/categories/:id', categories_controller.category_details);


router.get('/producers', producers_controller.producers);

module.exports = router;
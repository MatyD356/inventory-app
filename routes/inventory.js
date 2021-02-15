var express = require('express');
var router = express.Router();

var guitar_controller = require('../controller/guitarController')

router.get('/', guitar_controller.index);

module.exports = router;
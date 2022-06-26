var express = require('express');
let userRoute = require('./users');
var router = express.Router();

/* GET home page. */

router.use('/user', userRoute);

module.exports = router;

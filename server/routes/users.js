var express = require('express');
var router = express.Router();
const users = require('../bean/users')
/* GET users listing. */

router.route('/register').post(users.registerUser)
router.route('/login').post(users.loginUser)


module.exports = router;

const express = require('express');
const { login } = require('../controller/userController');

const router = express.Router();

router.route('/user/login').post(login);

module.exports = router;
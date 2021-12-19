const express = require('express');
const router = express.Router();
// const userController = require('../user/user.controller');
const userController = require('../user/user.controller.practice');

/* GET users listing. */
router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');


//Login route
router.post('/login', userController.login);


module.exports = router;
const express = require('express');
const router = express.Router();
const loginController = require('./../controllers/loginController');
const {verifyToken} = require("../middleware/auth");

router.post('/login', loginController.login)

module.exports = router;
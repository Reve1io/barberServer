const express = require('express');
const router = express.Router();
const loginController = require('./../controllers/loginController');
const {verifyToken} = require("../middleware/auth");

router.post('/', loginController.userAutorization)
router.get('/profile', verifyToken, (req, res) => {
    res.json({message: 'Secure data', userId: req.user.id});
});

module.exports = router;
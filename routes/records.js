const express = require('express');
const router = express.Router();
const recordsController = require('./../controllers/recordsController');

router.post('/records', recordsController.createRecord);

module.exports = router;
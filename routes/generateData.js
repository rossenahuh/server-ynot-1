const express = require('express');
const router = express.Router();
const generateDataController = require('../controllers/generateData');

router.get('/', generateDataController);
module.exports = router;

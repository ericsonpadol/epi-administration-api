const express = require('express');

const router = express.Router();

/**
 * @description Main Index Controller
 */
router.use('/main', require('./main/main.controller'));

module.exports = router;

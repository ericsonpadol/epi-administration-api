const express = require('express');

const router = express.Router();

/**
 * @description Main Index Controller
 */
router.use('/main', require('./main/main.controller'));

/**
 * @description User Management Controller
 */
router.use('/users', require('./user/index.controller'));

module.exports = router;

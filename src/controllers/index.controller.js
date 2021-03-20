const express = require('express');

const router = express.Router();

router.use('/main', require('./main/main.controller'));

module.exports = router;

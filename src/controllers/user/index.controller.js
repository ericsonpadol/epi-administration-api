const express = require('express');

const router = express.Router();

router.use('/', require('./user-create.controller'));

module.exports = router;

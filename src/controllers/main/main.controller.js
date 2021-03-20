const express = require('express');

const { localTime } = require('../../../config/luxon');
const { name, version } = require('../../../package.json');
const logger = require('../../../config/logger');

const router = express.Router();

/**
 * @swagger
 * /health:
 *  get:
 *      summary: test
 *      description: test
 */
router.get('/health', async (req, res) => {
  logger.info(JSON.stringify({ msg: `${name} is healthy...` }));

  return res.status(200).json({
    applicationTime: localTime.toISO(),
    applicationName: name,
    applicationVersion: version,
    message: 'I am healthy.',
    uptime: `${Math.floor(process.uptime() / 3600)} Hours`,
    cpu: process.cpuUsage(),
    memory: process.memoryUsage(),
    resource: process.resourceUsage(),
  });
});

module.exports = router;

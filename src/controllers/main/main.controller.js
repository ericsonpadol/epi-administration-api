const express = require('express');

const { localTime } = require('../../../config/luxon');
const { name, version } = require('../../../package.json');
const logger = require('../../../config/logger');

const router = express.Router();

/**
 * @openapi
 * path:
 * /main/health:
 *  get:
 *      tags: [Main]
 *      summary: Healthcheck information.
 *      description: Retrieve the healthcheck information of the current microservice.
 *      responses:
 *        200:
 *          description: Displays the list of healthcheck info.
 *          content:
 *           application/json:
 *            schema:
 *              type: object
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

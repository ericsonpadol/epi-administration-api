const { DateTime, Duration } = require('luxon');
const config = require('config');

const logger = require('./logger');

const localTime = DateTime.now().setZone(config.get('app.timezone'));

logger.debug(JSON.stringify({ localTime }));

module.exports = { DateTime, localTime, Duration };

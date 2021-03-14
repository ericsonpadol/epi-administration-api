const log4js = require('log4js');
const config = require('config');

const logger = log4js.getLogger(
  `[${process.env.NODE_ENV}] ${config.get('app.logging.index')}`
);

logger.level = config.get('app.logging.level');

module.exports = logger;

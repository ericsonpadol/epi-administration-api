const express = require('express');
const uuid = require('uuid');

// security implementation
const helmet = require('helmet');
const cors = require('cors');
const nocache = require('nocache');

const logger = require('./config/logger');
const { localTime } = require('./config/luxon');

const app = express();
const instanceId = uuid.v4();

app.use(cors());
app.use(helmet.hidePoweredBy());
app.use(helmet());
app.use(nocache());
app.use(express.json({ type: 'application/json', limit: '10mb' }));

logger.info(
  `Initializing API Services, ${process.env.NODE_ENV} Environment...`
);

logger.info(JSON.stringify({ instanceId, aliveTime: localTime }));

// api documentation and code quality
// if (
//   process.env.NODE_ENV === 'sandbox' ||
//   process.env.NODE_ENV === 'dev' ||
//   process.env.NODE_ENV === 'development'
// ) {
// }

module.exports = app;

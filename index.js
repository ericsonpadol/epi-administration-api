const express = require('express');
const uuid = require('uuid');
const config = require('config');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// security implementation
const helmet = require('helmet');
const cors = require('cors');
const nocache = require('nocache');

const logger = require('./config/logger');
const { localTime } = require('./config/luxon');
const swaggerOptions = require('./config/swaggerDoc');

// api
const apiController = require('./src/controllers/index.controller');

const app = express();
const instanceId = uuid.v4();
const appPath = `/${config.get('app.module')}/${config.get('app.contextPath')}`;

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use(`${appPath}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(cors());
app.use(helmet.hidePoweredBy());
app.use(helmet());
app.use(nocache());
app.use(express.json({ type: 'application/json', limit: '10mb' }));

logger.info(
  `Initializing API Services, ${process.env.NODE_ENV} Environment...`
);

logger.info(
  JSON.stringify({ instanceId, aliveTime: localTime, path: appPath })
);

// api documentation and code quality
if (
  process.env.NODE_ENV === 'sandbox' ||
  process.env.NODE_ENV === 'dev' ||
  process.env.NODE_ENV === 'development'
) {
  app.use(
    `${appPath}/api/documentation`,
    express.static(`${__dirname}/apidoc`)
  );

  app.use(`${appPath}/api/documentation`, (req, res) => {
    res.sendFile('index.html', { root: `${__dirname}/apidoc` });
  });

  app.use(
    `${appPath}/code-quality`,
    express.static(`${__dirname}/coverage/lcov-report`)
  );

  app.use(`${appPath}/code-quality`, (req, res) => {
    res.sendFile('index.html', { root: `${__dirname}/coverage/lcov-report` });
  });
}

// api routes
app.use(`${appPath}/api/${config.get('apidoc.version')}`, apiController);

module.exports = app;

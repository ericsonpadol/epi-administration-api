const fs = require('fs');
const https = require('https');

const logger = require('./config/logger');
const app = require('./index');
const { version, name } = require('./package.json');

const port = process.env.PORT || 8080;

const server = https.createServer(
  {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert'),
  },
  app
);

server.listen(port, () =>
  logger.info(
    JSON.stringify(
      `${name} v${version} - ${process.env.NODE_ENV} is running on port ${port}`
    )
  )
);

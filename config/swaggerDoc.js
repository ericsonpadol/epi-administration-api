const definition = {
  openapi: '3.0.1',
  info: {
    title: 'EPI: Backoffice Administration API',
    version: '1.0.0',
    description: 'Express Pay Backoffice Administration API',
    license: { name: 'Licensed under Express Pay INC.' },
  },
  servers: [
    {
      url: 'https://localhost:{port}/backoffice/administration/api',
      description: 'Localhost Server',
      variables: {
        port: {
          enum: ['8080'],
          default: '8080',
        },
      },
    },
  ],
  tags: [
    { name: 'Main' },
    { name: 'User-Management' },
    { name: 'Branch-Management' },
  ],
};

module.exports = {
  definition,
  apis: ['./src/controllers/**/*.js'],
  basePath: __dirname,
};

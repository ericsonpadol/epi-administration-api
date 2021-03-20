const definition = {
  openapi: '3.0.0',
  info: {
    title: 'EPI: Backoffice Administration API',
    version: '1.0.0',
    description: 'Express Pay Backoffice Administration API',
  },
  servers: [
    {
      url: 'http://localhost:8080/backoffice/administration',
      description: 'Localhost Server',
    },
  ],
};

module.exports = { definition, apis: ['./src/controllers/**/*.js'] };

/* eslint-disable global-require */
require('dotenv').config();

const express = require('express');
const http = require('http');
const pino = require('express-pino-logger');
const bodyParser = require('body-parser');
const routes = require('./components/routes');
const logger = require('./utils/logger');
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('../swagger/swagger.js');

/**
 * Config
 */
const { PORT } = process.env;

/**
 * Init App
 */
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Logging
 */
app.use(pino({ logger }));

// Add routes to the app.
app.use('/api/v1', routes());

// TODO: Document endpoints using swagger
// Swagger for documenting the api, access through localhost:xxxx/api-docs.
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const server = http.createServer(app);

/**
 * Start
 */

// Listen on port specfied in env-file.
server.listen({ port: PORT }, async () => {
  logger.info(`Server started on port ${PORT}`);
});

// Export server to use it in tests.
module.exports = server;

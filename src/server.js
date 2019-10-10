/* eslint-disable global-require */
require('dotenv').config();

const express = require('express');
const http = require('http');
const config = require('config');
const pino = require('express-pino-logger');
const bodyParser = require('body-parser');
const routes = require('./components/routes');
const logger = require('./utils/logger');
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('../swagger/swagger.js');

/**
 * Config
 */
const SERVER_PORT = process.env.PORT || config.get('SERVER.PORT');

/**
 * Init App
 */
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Request logging
app.use(pino({ logger }));

app.use('/api/v1', routes());

// TODO: Document endpoints using swagger
// Swagger for documenting the api, access through localhost:xxxx/api-docs.
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/**
 * Start
 */
const server = http.createServer(app).listen(SERVER_PORT, () => logger.info(`Watson app listening on port ${SERVER_PORT}!`));

// Export server to use it in tests.
module.exports = server;

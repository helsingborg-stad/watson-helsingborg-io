/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
}


const express = require('express');
// const config = require('config');
// TODO: Configure HTTPS properly, need to know deployment enviroment to do this.
// const https = require('https');
const http = require('http');
const pino = require('express-pino-logger');
// const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
// const swaggerDocument = require('../swagger/swagger.js');
const routes = require('./components/routes');
const logger = require('./utils/logger');
// const WebSocketServer = require('./ws.server');

/**
 * Config
 */
const { SERVER_PORT } = process.env;
const API_BASE = '/api/v1';

/**
 * Init App
 */
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Request logging
app.use(pino({ logger }));

// Add routes to the app.
app.get('/', (req, res) => res.send('Hello World!'));
app.use(API_BASE, routes());

// TODO: Document endpoints using swagger
// Swagger for documenting the api, access through localhost:xxxx/api-docs.
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const server = http.createServer(app);

/**
 * Create WebSocket server
 */
// const webSocketServer = new WebSocketServer(server, `${API_BASE}/ws`);

/**
 * Start
 */

// Listen on port specfied in env-file.
server.listen({ port: SERVER_PORT }, async () => {
  logger.info(`Server started on port ${SERVER_PORT}`);
  // webSocketServer.start();
});

// Export server to use it in tests.
module.exports = server;

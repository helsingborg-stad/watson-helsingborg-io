const express = require('express');
const config = require('config');
const https = require('https');
const pino = require('express-pino-logger');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const swaggerDocument = require('../swagger/swagger.js');
const routes = require('./components/routes');
const logger = require('./utils/logger');
const WebSocketServer = require('./ws.server');

/**
 * Config
 */
const SERVER_PORT = process.env.PORT || config.get('SERVER.PORT');
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

// Swagger for documenting the api, access through localhost:xxxx/api-docs.
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const server = https.createServer(app);

/**
 * Create WebSocket server
 */
const webSocketServer = new WebSocketServer(server, `${API_BASE}/ws`);

/**
 * Start
 */

// Listen on port specfied in env-file.
server.listen({ port: SERVER_PORT }, async () => {
  logger.info(`Server started on port ${SERVER_PORT}`);
  webSocketServer.start();
});

// Export server to use it in tests.
module.exports = server;

const pino = require('pino');
const config = require('config');

module.exports = pino({ level: process.env.LOG_LEVEL });

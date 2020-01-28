const express = require('express');
const session = require('./session/session.api');
const message = require('./message/message.api');
const pjson = require('../../package.json');

const routes = () => {
  const router = express.Router();

  router.get('/', async (req, res) => res.json({
    jsonapi: {
      version: '1.0',
      meta: {
        service: pjson.name,
        owner: 'Helsingborg Stad',
        description: pjson.description,
      },
    },
  }));

  // Register route to api-layer.
  router.use('/session', session());
  router.use('/message', message());

  return router;
};


module.exports = routes;

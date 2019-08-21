const express = require('express');

const workspaces = require('./workspaces/workspaces.api');
const message = require('./message/message.api');

const routes = () => {
  const router = express.Router();

  // Register route to api-layer.
  router.use('/workspaces', workspaces());
  router.use('/message', message());

  return router;
};


module.exports = routes;

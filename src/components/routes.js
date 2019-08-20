const express = require('express');

const person = require('./person/person.api');
const workspaces = require('./workspaces/workspaces.api');

const routes = () => {
  const router = express.Router();

  // Register route to api-layer.
  router.use('/person', person());
  router.use('/workspaces', workspaces());

  return router;
};


module.exports = routes;

const express = require('express');
const dal = require('./workspaces.dal');

// TODO create test for GET /workspaces
const routes = () => {
  const router = express.Router();

  router.get('/', async (req, res) => dal.read.workspaces(req, res));

  return router;
};

module.exports = routes;

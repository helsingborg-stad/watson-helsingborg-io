const express = require('express');
const dal = require('./session.dal');

const routes = () => {
  const router = express.Router();

  router.post('/', async (req, res) => dal.create.session(req, res));

  return router;
};

module.exports = routes;

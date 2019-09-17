const express = require('express');
const { listWorkSpaces } = require('../../service/watson');

// TODO create test for GET /workspaces
const routes = () => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    try {
      const result = await listWorkSpaces();

      return res.json(result);
    } catch (err) {
      // Send back error in json.
      return res.status(err.status || 500).json(err);
    }
  });

  return router;
};

module.exports = routes;

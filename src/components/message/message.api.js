const express = require('express');
const { postSchema } = require('./message.schema');
const Validator = require('../..//middlewares/validator.middleware');
const dal = require('./message.dal');

// TODO create test for POST /message
const routes = () => {
  const router = express.Router();

  router.post('/', Validator(postSchema, 'body', true), async (req, res) => dal.create.message(req, res));

  return router;
};

module.exports = routes;

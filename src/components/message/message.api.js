const express = require('express');
const { postSchema } = require('./message.schema');
const Validator = require('../..//middlewares/validator.middleware');

const { message } = require('../../service/watson');

const routes = () => {
  const router = express.Router();

  // Here we register what endpoints we want.
  router.post('/', Validator(postSchema, 'body', true), async (req, res) => {
    try {
      // Get the parameters from the request
      const { workspaceId, textInput, context } = req.body;

      // Fetch data from another layer.
      const response = await message(textInput, context, workspaceId);

      // Convert response to json before sending it.
      return res.json(response);
    } catch (err) {
      // Send back error in json.
      return res.status(err.status || 500).json(err);
    }
  });

  return router;
};

module.exports = routes;

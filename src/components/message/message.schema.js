const Joi = require('@hapi/joi');
const { guid } = require('../../validation/global.schema');

// Generic Schema.
const postSchema = Joi.object().keys({
  textInput: Joi.string().allow('').required(),
  context: Joi.object().keys({
    conversation_id: Joi.string(),
    system: Joi.object(),
  }),
  workspaceId: guid,
  intents: Joi.array(),
  entities: Joi.array(),
});

module.exports = {
  postSchema,
};

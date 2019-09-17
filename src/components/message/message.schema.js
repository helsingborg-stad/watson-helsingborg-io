const Joi = require('@hapi/joi');
const { guid } = require('../../validation/global.schema');

// Generic Schema.
const postSchema = Joi.object().keys({
  textInput: Joi.string().required(),
  context: Joi.object().keys({
    conversation_id: Joi.string(),
  }),
  workspaceId: guid,
});

module.exports = {
  postSchema,
};

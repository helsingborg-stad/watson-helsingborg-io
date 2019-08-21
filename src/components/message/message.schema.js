const Joi = require('@hapi/joi');
const { guid } = require('../../validation/global.schema');

// Generic Schema.
const postSchema = Joi.object().keys({
  workspaceId: guid.required(),
  textInput: Joi.string().required(),
  context: Joi.string(),
});

module.exports = {
  postSchema,
};

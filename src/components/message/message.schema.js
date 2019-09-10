const Joi = require('@hapi/joi');
const { guid } = require('../../validation/global.schema');

// Generic Schema.
const postSchema = Joi.object().keys({
  textInput: Joi.string().required(),
  context: Joi.string(),
  workspaceId: guid,
});

module.exports = {
  postSchema,
};

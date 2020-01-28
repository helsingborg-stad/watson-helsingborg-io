const jsonapi = require('../../jsonapi');
const logger = require('../../utils/logger');
const { message, createSession } = require('../../service/watson');
const { BadRequestError } = require('../../utils/error');

const createErrorResponse = async (error, res) => {
  logger.error(error);
  const serializedData = await jsonapi.serializer.serializeError(error);
  return res.status(error.status || error.code).json(serializedData);
};

const createSuccessResponse = async (data, res, jsonapiType, converter) => {
  const serializedData = await jsonapi.serializer.serialize(jsonapiType, data);
  return res.json(serializedData);
};

/**
 * CREATE RESOURCE METHODS
 */

const sendMessage = async (req, res) => {
  const {
    assistantId, textInput, context, intents, entities,
  } = req.body;
  let { sessionId } = req.body;

  if (!assistantId) {
    throw new BadRequestError('Missing required arguments: assistantId.');
  }

  // Create a new session if parameter 'sessionId' is missing
  if (!sessionId) {
    try {
      const sessionData = await createSession(assistantId);
      sessionId = sessionData.result.session_id;
      // return await createSuccessResponse(resourceData.result, res, 'session');
    } catch (error) {
      return createErrorResponse(error, res);
    }
  }

  try {
    // Fetch data from another layer.
    const response = await message(textInput, sessionId, assistantId, context, intents, entities);
    response.result.session_id = sessionId;

    return await createSuccessResponse(response.result, res, 'message', 'includeId');
  } catch (error) {
    return createErrorResponse(error, res);
  }
};

const create = {
  message: sendMessage,
};

module.exports = {
  create,
};

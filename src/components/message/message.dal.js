const jsonapi = require('../../jsonapi');
const logger = require('../../utils/logger');
const { message } = require('../../service/watson');
const { BadRequestError } = require('../../utils/error');

const createErrorResponse = async (error, res) => {
  logger.error(error);
  const serializedData = await jsonapi.serializer.serializeError(error);
  return res.status(error.status).json(serializedData);
};

const createSuccessResponse = async (data, res, jsonapiType, converter) => {
  const serializedData = await jsonapi.serializer.serialize(jsonapiType, data);
  return res.json(serializedData);
};

/**
 * CREATE RESOURCE METHODS
 */

const sendMessage = async (req, res) => {
  // Write method for reading a resource (in this case a get request towards the testapi)
  try {
    const {
      assistantId, sessionId, textInput, context, intents, entities,
    } = req.body;

    if (!sessionId) {
      throw new BadRequestError('Missing required arguments: sessionId.');
    }

    // Fetch data from another layer.
    const response = await message(textInput, sessionId, assistantId, context, intents, entities);

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

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
  const convertData = await jsonapi.convert[converter](data);
  const serializedData = await jsonapi.serializer.serialize(jsonapiType, convertData);
  return res.json(serializedData);
};

/**
 * CREATE RESOURCE METHODS
 */

const sendMessage = async (req, res) => {
  // Write method for reading a resource (in this case a get request towards the testapi)
  try {
    const { workspaceId, textInput, context } = req.body;

    if (!workspaceId) {
      throw new BadRequestError('Missing required arguments: workspaceId.');
    }

    // Fetch data from another layer.
    const response = await message(textInput, context, workspaceId);

    return await createSuccessResponse(response, res, 'message', 'includeId');
  } catch (error) {
    console.log('wejofnworögeärogj');
    return createErrorResponse(error, res);
  }
};

const create = {
  message: sendMessage,
};

module.exports = {
  create,
};

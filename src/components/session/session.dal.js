const jsonapi = require('../../jsonapi');
const logger = require('../../utils/logger');
const { createSession } = require('../../service/watson');
const { BadRequestError } = require('../../utils/error');

const createErrorResponse = async (error, res) => {
  logger.error(error);
  const serializedData = await jsonapi.serializer.serializeError(error);
  return res.status(error.status || error.code).json(serializedData);
};

const createSuccessResponse = async (data, res, jsonapiType) => {
  const serializedData = await jsonapi.serializer.serialize(jsonapiType, data);
  return res.json(serializedData);
};

/**
 * READ RESOURCE METHODS
 */
const createNewSession = async (req, res) => {
  const {
    assistantId,
  } = req.body;

  if (!assistantId) {
    throw new BadRequestError('Missing required arguments: assistantId.');
  }

  try {
    const resourceData = await createSession(assistantId);

    return await createSuccessResponse(resourceData.result, res, 'session');
  } catch (error) {
    return createErrorResponse(error, res);
  }
};

const create = {
  session: createNewSession,
};

module.exports = {
  create,
};


const jsonapi = require('../../jsonapi');
const logger = require('../../utils/logger');
const { listWorkSpaces } = require('../../service/watson');

const createErrorResponse = async (error, res) => {
  logger.error(error);
  const serializedData = await jsonapi.serializer.serializeError(error);
  return res.status(error.status).json(serializedData);
};

const createSuccessResponse = async (data, res, jsonapiType) => {
  const serializedData = await jsonapi.serializer.serialize(jsonapiType, data);
  return res.json(serializedData);
};

/**
 * READ RESOURCE METHODS
 */

const getWorkSpaces = async (req, res) => {
  // Write method for reading a resource (in this case a get request towards the testapi)
  try {
    const resourceData = await listWorkSpaces();

    return await createSuccessResponse(resourceData.workspaces, res, 'workspaces');
  } catch (error) {
    return createErrorResponse(error, res);
  }
};

const read = {
  workspaces: getWorkSpaces,
};

module.exports = {
  read,
};

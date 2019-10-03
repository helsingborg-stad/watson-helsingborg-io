const Serializer = require('./serializer.jsonapi');
const addIdToApiResponse = require('./convert/convert.jsonapi');

/**
 * Export
 * serializer: instance of json-api-serializer
 * convert: helper functions to convert data to serializable objects.
 */

module.exports = {
  serializer: Serializer,
  convert: {
    includeId: addIdToApiResponse,
  },
};

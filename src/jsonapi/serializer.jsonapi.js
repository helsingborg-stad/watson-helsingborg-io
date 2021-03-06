const JSONAPISerializer = require('json-api-serializer');
const schemas = require('./schemas');

/**
 * Serializer
 * create a new json-api-serializer with global options for all schemas in jsonapi/schemas.
 * docs can be found at https://github.com/danivek/json-api-serializer
 */

const Serializer = new JSONAPISerializer({
  convertCase: 'snake_case',
  unconvertCase: 'camelCase',
});

/**
 * Register
 * register schemas to serializer imported from jsonapi/schemas.
 */

Serializer.register('message', schemas.message);
Serializer.register('session', schemas.session);

module.exports = Serializer;

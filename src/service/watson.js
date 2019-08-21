const AssistantV1 = require('ibm-watson/assistant/v1');

/**
 * Assistant object used to interact with Watson API
 */
const assistant = new AssistantV1({
  /**
   * Defines which release to use
   * @name version
   * @type {String} release date which can be found on each release here: https://github.com/watson-developer-cloud/node-sdk/releases
   */
  version: process.env.ASSISTANT_VERSION_DATE,

  /**
   * Authentication
   * @name iam_apikey
   * @type {String}
   */
  iam_apikey: process.env.ASSISTANT_IAM_APIKEY,

  /**
   * Base URL for requests, can be found under the service credentials
   * @name url
   * @type {String}
   */
  url: process.env.ASSISTANT_URL,

  /**
   * Wheter to use SSL or not
   * TODO: Configure HTTPS properly, need to know deployment enviroment to do this.
   * @name disable_ssl_verification
   * @type {Boolean}
   */
  disable_ssl_verification: true,
});

/**
 * Get list of workspaces
 * @return {promise}
 */
const listWorkSpaces = () => assistant.listWorkspaces();

/**
 * Send user input message to Watson
 * @param {String} workspaceId GUID of a workspace (Can be found using listWorkSpaces method)
 * @param {String} text User input message
 * @param {String} context Conversation ID, defaults to undefined (to initiate a new conversation)
 * @return {promise} Watson response
 */
const message = (workspaceId, text, context = undefined) => {
  const payload = {
    workspace_id: workspaceId,
    input: {
      text,
    },
    context,
  };
  return new Promise((resolve, reject) => assistant.message(payload, (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  }));
};

module.exports = { assistant, message, listWorkSpaces };

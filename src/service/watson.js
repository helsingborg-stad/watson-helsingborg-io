const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

/**
 * Assistant object used to interact with Watson API
 */
const assistantV2 = new AssistantV2({
  version: process.env.ASSISTANT_VERSION_DATE,
  authenticator: new IamAuthenticator({
    apikey: process.env.ASSISTANT_IAM_APIKEY,
  }),
  url: process.env.SERVICE_ENDPOINT,
});

/**
 * Create a session
 * @param {string} assistantId
 */
const createSession = (assistantId) => {
  const request = assistantV2.createSession({
    assistantId: assistantId || process.env.ASSISTANT_ID,
  })
    .then(res => res)
    .catch(err => err);

  return request;
};

/**
 * Send user input message to Watson
 * @param {String} sessionId Session ID
 * @param {String} assistantId GUID of an assistant
 * @param {String} text User input message
 * @param {String} context Conversation ID, defaults to undefined (to initiate a new conversation)
 * @return {promise} Watson response
 */
const message = (
  text,
  sessionId,
  assistantId,
  context = undefined,
  intents = undefined,
  entities = undefined,
) => {
  const payload = {
    assistantId: assistantId || process.env.ASSISTANT_ID,
    sessionId,
    input: {
      message_type: 'text',
      text,
      options: {
        return_context: true,
      },
    },
    context,
    intents,
    entities,
  };

  return new Promise((resolve, reject) => assistantV2.message(payload, (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  }));
};

module.exports = {
  message, createSession,
};

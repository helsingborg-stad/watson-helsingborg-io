const addIdToApiResponse = (data) => {
  const dataObject = data;
  dataObject.id = data.context.conversation_id;
  return dataObject;
};

module.exports = addIdToApiResponse;

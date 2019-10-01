
const createObjectFromApiResponse = (data) => {
  console.log(data);

  const dataObject = data.workspaces;

  return dataObject;
};

module.exports = createObjectFromApiResponse;

const workspacesJsonApiSchema = {
  id: 'workspace_id',
  topLevelMeta(data, extraData) {
    return {
      count: extraData.count,
      total: data.length,
    };
  },
};

module.exports = workspacesJsonApiSchema;

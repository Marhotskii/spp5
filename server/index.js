const taskService = require('./taskService');

const rootResolver = {
  ...taskService
};

module.exports = rootResolver;
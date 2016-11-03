const logger = require('./logger');

module.exports = {
  queueLength: 10,
  mongo: {
    url: 'mongodb://localhost:27017/liftsync',
    modelPath: '../models'
  },
  jwtSecret: 'superSecret',
  logger
};

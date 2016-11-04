const logger = require('./logger');

module.exports = {
  mongo: {
    url: 'mongodb://localhost:27017/liftsync',
    modelPath: '../models'
  },
  jwtSecret: 'superSecret',
  logger
};

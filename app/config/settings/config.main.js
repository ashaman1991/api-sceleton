const logger = require('./logger');

module.exports = {
  // MongoDB configuration
  mongo: {
    url: 'mongodb://localhost:27017/liftsync',
    modelPath: '../models'
  },
  jwtSecret: 'superSecret', // secret key for signing JWT tokens
  logger
};

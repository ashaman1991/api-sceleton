module.exports = {
  hostName: '0.0.0.0',
  port: 3000,
  mongo: {
    url: 'mongodb://mongo:27017/liftsync',
    modelPath: '../models'
  },
  logger: {
    level: 'warn'
  }
};

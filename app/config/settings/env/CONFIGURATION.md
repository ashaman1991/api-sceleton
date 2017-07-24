## Environment config example
```js
module.exports = {
  hostName: '0.0.0.0',
  port: 3000,
  mongo: {
    url: 'mongodb://mongo:27017/api',
    modelPath: '../models'
  },
  logger: {
    level: 'warn'
  }
};
```
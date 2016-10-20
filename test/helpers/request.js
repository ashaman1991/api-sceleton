const request = require('supertest-as-promised');
const jwt = require('jsonwebtoken');

module.exports = {
  post(path, userId) {
    const jwtToken = jwt.sign({ id: userId }, settings.jwtSecret);
    return request(global.application)
      .post(path)
      .set('Authorization', `Bearer ${jwtToken}`);
  },
  get(path, userId) {
    const jwtToken = jwt.sign({ id: userId }, settings.jwtSecret);
    return request(global.application)
      .get(path)
      .set('Authorization', `Bearer ${jwtToken}`);
  },
  del(path, userId) {
    const jwtToken = jwt.sign({ id: userId }, settings.jwtSecret);
    return request(global.application)
      .delete(path)
      .set('Authorization', `Bearer ${jwtToken}`);
  },
  put(path, userId) {
    const jwtToken = jwt.sign({ id: userId }, settings.jwtSecret);
    return request(global.application)
      .put(path)
      .set('Authorization', `Bearer ${jwtToken}`);
  }
};

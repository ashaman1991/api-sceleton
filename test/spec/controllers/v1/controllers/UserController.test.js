const helpers = require('../../../../helpers');

describe('UserController Tests : ', () => {
  describe('CRUD', () => {
    it('should create user record', () => {
      return request
        .get('/v1/user', helpers.db.getObjectId('1'))
        .expect(200);
    });
    it('should update user record', () => {
      return request
        .put('/v1/user/000000000000000000000001', helpers.db.getObjectId('1'))
        .send({
          password: '12345',
          email: 'ololololololololo@lololo.lol'
        })
        .expect(200);
    });
  });
});

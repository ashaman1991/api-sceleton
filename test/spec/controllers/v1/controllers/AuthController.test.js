
describe('AuthController Tests', () => {
  it('should respond with 200', () => {
    return request.post('/v1/signin')
      .send({
        username: 'ololosh',
        password: '12345qwer'
      })
      .expect(200)
      .then(({ body: data }) => {
        assert.isString(data.token);
        assert.isObject(data.user);
      });
  });
});

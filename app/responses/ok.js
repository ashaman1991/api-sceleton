module.exports = function ok(data = {}, code = 'OK', status = 200) {
  const response = {
    code,
    data
  };
  this.status(status).send(response);
};

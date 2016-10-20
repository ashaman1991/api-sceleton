module.exports = {

  /**
   * TODO: replace this with a proper find query
   */
  index(req, res, next) {
    const u1 = new User({ username: 'ololo', password: '12345' });
    u1.save()
      .then((result) => {
        res.ok(result);
      })
      .catch(next);
  },

  /**
   * Update user record
   */
  update(req, res, next) {
    const updatedUser = _.merge(req.user, req.body);

    updatedUser
      .save()
      .then((result) => {
        res.ok(result);
      })
      .catch(next);
  }
};

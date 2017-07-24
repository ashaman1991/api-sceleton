const accessList = require('./aclRoles');

module.exports = {
  options: {
    get_role(req, callback) {
      if (req.user && req.user.type) {
        return callback(null, req.user.type);
      }
      return callback(null, false);
    },
    default: 'user',
    success_message: 'ok',
    failure_message: 'fail'
  },
  accessList
};

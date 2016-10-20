const helper = require('../db');

module.exports = [
  {
    _id: helper.getObjectId(1),
    username: 'ololosh',
    password: '12345qwer',
    email: 'user@somemail.com'
  }
];

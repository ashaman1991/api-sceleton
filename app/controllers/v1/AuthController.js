const passport = require('passport');
const jwt = require('jsonwebtoken');

function onPassportAuth(req, res, error, user) {
  if (error) { return res.status(500).json(error); }
  const token = jwt.sign({ id: user._id }, settings.jwtSecret); // eslint-disable-line
  return res.status(200).send({ token, user });
}

module.exports = {
  signin(req, res) {
    passport.authenticate('local', onPassportAuth.bind(this, req, res))(
      req, res);
  }
};

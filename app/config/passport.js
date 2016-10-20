const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const options = {
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: false,
  session: false
};

function onLocalAuth(username, password, done) {
  User.findOne({ username }, (err, user) => {
    if (err) { return done(err); }
    if (!user) { return done(new Error('Invalid username')); }

    if (bcrypt.compareSync(password, user.password)) {
      return done(null, user);
    }
    return done(new Error('Invalid password'));
  });
}

passport.use(new LocalStrategy(options, onLocalAuth));

module.exports = passport.initialize();

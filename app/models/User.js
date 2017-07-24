const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

/**
 * Check if string is bcrypt hash
 */
function isHash(string) {
  const regex = /^\$2[ayb]\$.{56}$/;
  return regex.test(string);
}

const userSchema = new mongoose.Schema(
  {
    username: { type: String, index: { unique: true } },
    email: { type: String, index: { unique: true } },
    type: { type: String, enum: ['admin', 'user'], default: 'user' },
    password: String
  },
  {
    collection: 'user'
  }
);

userSchema.pre('save', function(next) {
  this.password = bcrypt.hashSync(this.password, 5);
  next();
});

userSchema.pre('update', function(next) {
  // just to be sure, but this should not be an issue
  if (this.password) {
    if (isHash(this.password)) {
      delete this.password;
    } else {
      this.password = bcrypt.hashSync(this.password, 5);
    }
  }
  return next();
});

module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 12;

const UserSchema = new mongoose.Schema({
  name: {
    type: String
  },
  picture: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String,
  },
  registeredDate: {
    type: Date,
    default: Date.now
  },
  googleId: {
    type: String
  },
  facebookId: {
    type: String
  }
});

UserSchema.pre('save', function (next) {
  var user = this;

  if (user.isModified('password')) {
    // console.log('password changed')
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.methods.comparePassword = function (plainPassword) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    return isMatch;
  });
}

const User = mongoose.model('User', UserSchema);

module.exports = User;

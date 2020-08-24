const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 12;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  picture: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  registeredDate: {
    type: Date,
    default: Date.now,
  },
  googleId: {
    type: String,
  },
  facebookId: {
    type: String,
  },
});

UserSchema.pre('save', function (next) {
  const user = this;

  if (user.isModified('password')) {
    // console.log('password changed')
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        next(err);
        return;
      }

      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          next(err);
          return;
        }

        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.methods.comparePassword = function compare(plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
    if (err) {
      cb(err);
      return;
    }

    cb(null, isMatch);
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;

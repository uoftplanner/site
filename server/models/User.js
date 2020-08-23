const mongoose = require('mongoose');

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
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;

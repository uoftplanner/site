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

UserSchema.pre('save', async () => {
  const user = this;

  if (user.isModified('password')) {
    // console.log('password changed')
    user.password = await bcrypt.hash(user.password, saltRounds);
  }
});

UserSchema.methods.isCorrectPassword = function isCorrectPassword(plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;

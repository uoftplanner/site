const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const passportSetup = require('./config/passport_setup');

const keys = require('./config/key');

const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const coursesRouter = require('./routes/courses');

const db = keys.mongoUri;
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('MongoDB connected.'))
  .catch(err => console.log(err));

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieSession({
  // 1 day
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/api', coursesRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening on ${port}.`);
});

module.exports = app;

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const OAuthKeys = require('./key').oauth;

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id).then(user => {
    cb(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: OAuthKeys.google.clientId,
      clientSecret: OAuthKeys.google.clientSecret,
      callbackURL: '/auth/google/redirect',
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const user = await User.findOne({googleId: profile.id}).exec();

        if (!user) {
          const newUser = new User({
            name: profile.displayName,
            picture: profile._json.picture,
            email: profile._json.email,
            googleId: profile.id,
          });

          await newUser.save();
          cb(null, newUser);
          return;
        }

        cb(null, user);
      } catch (err) {
        cb(err);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: OAuthKeys.facebook.clientId,
      clientSecret: OAuthKeys.facebook.clientSecret,
      callbackURL: '/auth/facebook/redirect',
      profileFields: ['id', 'email', 'name', 'picture.type(large)'],
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const user = await User.findOne({facebookId: profile.id}).exec();

        if (!user) {
          const newUser = new User({
            name: `${profile._json.first_name} ${profile._json.last_name}`,
            picture: profile._json.picture.data.url,
            email: profile._json.email,
            facebookId: profile.id,
          });

          await newUser.save();
          cb(null, newUser);
          return;
        }

        cb(null, user);
      } catch (err) {
        cb(err);
      }
    }
  )
);

passport.use(
  new LocalStrategy({usernameField: 'email', session: true}, async (email, password, done) => {
    try {
      const user = await User.findOne({email}).exec();

      if (!user || !(await user.isCorrectPassword(password))) {
        done(null, false, {
          message: 'Invalid username or password!',
        });

        return;
      }

      done(null, user);
    } catch (err) {
      done(err);
    }
  })
);

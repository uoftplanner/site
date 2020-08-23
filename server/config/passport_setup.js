const passport = require('passport');
const User = require('../models/User');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const OAuthKeys = require('./key').oauth;

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id).then(user => {
    cb(null, user);
  });
});

passport.use(new GoogleStrategy({
  clientID: OAuthKeys.google.clientId,
  clientSecret: OAuthKeys.google.clientSecret,
  callbackURL: '/auth/google/redirect'
},
  (accessToken, refreshToken, profile, cb) => {
    console.log(profile);
    User.findOne({googleId: profile.id}, (err, user) => {
      if (err) {
        return db(err);
      }

      if (!user) {
        user = new User({
          name: profile.displayName,
          picture: profile._json.picture,
          email: profile._json.email,
          googleId: profile.id,
        });

        user.save((err) => {
          if (err) {
            console.log(err);
          }
          return cb(err, user);
        });
      } else {
        return cb(err, user);
      }
    });
  }
));

passport.use(new FacebookStrategy({
  clientID: OAuthKeys.facebook.clientId,
  clientSecret: OAuthKeys.facebook.clientSecret,
  callbackURL: '/auth/facebook/redirect',
  profileFields: ['id', 'email', 'name', 'picture.type(large)']
},
  function (accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOne({facebookId: profile.id}, (err, user) => {
      if (err) {
        return db(err);
      }

      if (!user) {
        user = new User({
          name: profile._json.first_name + ' ' + profile._json.last_name,
          picture: profile._json.picture.data.url,
          email: profile._json.email,
          facebookId: profile.id,
        });

        user.save((err) => {
          if (err) {
            console.log(err);
          }
          return cb(err, user);
        });
      } else {
        return cb(err, user);
      }
    });
  }
));

passport.use(new LocalStrategy(
  function (email, password, cb) {
    User.findOne({email: email}, (err, user) => {
      if (err) {return cb(err);}
      if (!user) {return cb(null, false);}
      if (!user.verifyPassword(password)) {return cb(null, false);}
      return cb(null, user);
    });
  }
));

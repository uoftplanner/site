module.exports = {
  redisHost: process.env.REDIS_HOST,
  mongoUri: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  passwordResetKey: process.env.PASSWORD_RESET_KEY,
  oauth: {
    google: {
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    },
    facebook: {
      clientId: process.env.FACEBOOK_OAUTH_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_OAUTH_CLIENT_SECRET,
    },
  },
};

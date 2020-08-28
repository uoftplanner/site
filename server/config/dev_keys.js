module.exports = {
  redisHost: 'YOUR REDIS DEVELOPMENT HOST HERE',
  mongoUri: 'MONGOURI',
  cookieKey: 'SECRET KEY FOR COOKIE-SESSION',
  passwordResetKey: 'SECRET KEY FOR GENERATING PASSWORD RESET TOKENS',
  oauth: {
    google: {
      clientId: 'GOOGLE APP ID',
      clientSecret: 'GOOGLE APP SECRET',
    },
    facebook: {
      clientId: 'FACEBOOK APP ID',
      clientSecret: 'FACEBOOK APP SECRET',
    },
  },
};

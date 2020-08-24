const express = require('express');

const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth_middleware');

/* GET /auth/ retrieve user info */
// TODO: remove password and other unnecessary info from req.user object
router.get('/', authMiddleware, (req, res) => {
  return res.status(200).json({success: true, user: req.user});
});

/* GET login with Google */
router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

/* GET Google redirect */
router.get(
  '/google/redirect',
  passport.authenticate('google', {failureRedirect: 'http://localhost:3000/login/'}),
  (req, res) => {
    // Successful authentication, redirect home.
    // TODO: for production, use actual link to homepage
    res.redirect('http://localhost:3000/');
  }
);

/* GET login with Facebook */
router.get('/facebook', passport.authenticate('facebook', {scope: ['email']}));

/* GET Facebook redirect */
router.get(
  '/facebook/redirect',
  passport.authenticate('facebook', {failureRedirect: 'http://localhost:3000/login/'}),
  (req, res) => {
    // Successful authentication, redirect home.
    // TODO: for production, use actual link to homepage
    res.redirect('http://localhost:3000/');
  }
);

/* POST Local strategy (email and password) login */
router.post('/login', (req, res, next) => {
  passport.authenticate(
    'local',
    {
      failureRedirect: 'http://localhost:3000/login/',
      successRedirect: 'http://localhost:3000/',
    },
    (err, user, info) => {
      if (err) {
        console.log(err);
        next(err);
        return;
      }

      if (!user) {
        console.log(user);
        res.status(401).json({success: false, msg: info.message});
        return;
      }

      req.login(user, err => {
        if (err) {
          next(err);
          return;
        }

        res.status(200).json({success: true});
      });
    }
  )(req, res, next);
});

/* GET logout from app */
router.get('/logout', (req, res) => {
  req.logout();
  return res.status(200).json({success: true});
});

/* router.post('/login', passport.authenticate('local', {failureRedirect: '/'}), (req, res) => {
  console.log(req);
  res.redirect('http://localhost:3000/');
}); */

/* POST Local strategy (email and password) register */
router.post('/register', (req, res) => {
  const user = new User(req.body);

  user.save(err => {
    if (err) {
      return res.status(400).json({success: false, err});
    }

    return res.status(200).json({success: true});
  });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const passport = require('passport');

/* GET login with Google */
router.get('/google',
  passport.authenticate('google', {scope: ['profile', 'email']}));

/* GET Google redirect */
router.get('/google/redirect',
  passport.authenticate('google', {failureRedirect: 'http://localhost:3000/login/'}),
  (req, res) => {
    // Successful authentication, redirect home.
    // TODO: for production, use actual link to homepage
    res.redirect('http://localhost:3000/');
  });

/* GET login with Facebook */
router.get('/facebook',
  passport.authenticate('facebook'));

/* GET Facebook redirect */
router.get('/facebook/redirect',
  passport.authenticate('facebook', {failureRedirect: 'http://localhost:3000/login/'}),
  (req, res) => {
    // Successful authentication, redirect home.
    // TODO: for production, use actual link to homepage
    res.redirect('http://localhost:3000/');
  });

module.exports = router;

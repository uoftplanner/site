const express = require('express');
const router = express.Router();
const passport = require('passport');

/* GET login with Google */
router.get('/google',
  passport.authenticate('google', {scope: ['profile', 'email']}));

/* GET Google redirect */
router.get('/google/redirect',
  passport.authenticate('google', {failureRedirect: '/login'}),
  (req, res) => {
    // Successful authentication, redirect home.
    // TODO: for production, use actual link to homepage
    res.redirect('http://localhost:3000/');
  });

module.exports = router;

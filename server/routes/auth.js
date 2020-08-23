const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

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
  passport.authenticate('facebook', {scope: ['email']}));

/* GET Facebook redirect */
router.get('/facebook/redirect',
  passport.authenticate('facebook', {failureRedirect: 'http://localhost:3000/login/'}),
  (req, res) => {
    // Successful authentication, redirect home.
    // TODO: for production, use actual link to homepage
    res.redirect('http://localhost:3000/');
  });

/* POST Local strategy (email and password) login */
router.post('/login',
  passport.authenticate('local', {failureRedirect: 'http://localhost:3000/login/'}),
  (req, res) => {
    res.redirect('http://localhost:3000/');
  });

/* POST Local strategy (email and password) register */
router.post("/register", (req, res) => {

  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.status(400).send({success: false, err});
    return res.status(200).send({
      success: true
    });
  });
});

module.exports = router;

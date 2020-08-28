const express = require('express');

const router = express.Router();
const passwordResetKey = require('../config/key').passwordResetKey;
const crypto = require('crypto');
const moment = require('moment');
const User = require('../models/User');

// Code adapted from BossOz: https://stackoverflow.com/a/60863083

const base64Encode = data => {
  let buff = new Buffer.from(data);
  return buff.toString('base64');
};

const base64Decode = data => {
  let buff = new Buffer.from(data, 'base64');
  return buff.toString('ascii');
};

const sha256 = (salt, password) => {
  var hash = crypto.createHash('sha512', password);
  hash.update(salt);
  var value = hash.digest('hex');
  return value;
};

router.post('/forgot', (req, res) => {
  try {
    const email = req.body.email;

    User.findOne({email}, (err, user) => {
      if (err) {
        return res.status(400).json({success: false, err});
      }

      if (!user) {
        return res.status(401).json({success: false, err: 'Invalid email address.'});
      }

      // Generate the necessary data for the link
      const today = base64Encode(new Date().toISOString());
      const ident = base64Encode(user._id.toString());
      const data = {
        today: today,
        userId: user._id,
        password: user.password,
        email: user.email,
      };
      const hash = sha256(JSON.stringify(data), passwordResetKey);
      const link = `/reset/${ident}/${today}-${hash}`;

      // TODO: send an email with the link
      // For now, we just return the link
      return res.status(200).json({success: true, link});
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      err: 'Unexpected error during the password reset process: ' + err.message,
    });
    return;
  }
});

router.get('/check/:ident/:today-:hash', (req, res) => {
  try {
    // Check if the link in not out of date
    const today = base64Decode(req.params.today);
    const then = moment(today);
    const now = moment().utc();
    const timeSince = now.diff(then, 'hours');
    if (timeSince > 2) {
      res.status(401).json({success: false, err: 'The link is invalid.'});
      return;
    }

    const userId = base64Decode(req.params.ident);

    User.findOne({_id: userId}, (err, user) => {
      if (err) {
        return res.status(401).json({success: false, err});
      }

      if (!user) {
        return res.status(401).json({success: false, err: 'Invalid email address.'});
      }

      // Hash again all the data to compare it with the link
      // The link in invalid when:
      // 2. If the salt is changed, the user has already changed the password
      const data = {
        today: req.params.today,
        userId: user._id,
        password: user.password,
        email: user.email,
      };
      const hash = sha256(JSON.stringify(data), passwordResetKey);

      if (hash !== req.params.hash) {
        return res.status(401).json({success: false, err: 'The link is invalid.'});
      }

      return res.status(200).json({success: true, msg: 'Please proceed to reset password.'});
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      err: 'Unexpected error during the password reset process: ' + err.message,
    });
    return;
  }
});

router.post('/reset', (req, res) => {
  try {
    // Check if the link in not out of date
    const today = base64Decode(req.body.today);
    const then = moment(today);
    const now = moment().utc();
    const timeSince = now.diff(then, 'hours');
    if (timeSince > 2) {
      res.status(401).json({success: false, err: 'The link is invalid.'});
      return;
    }

    const userId = base64Decode(req.body.ident);

    User.findOne({_id: userId}, (err, user) => {
      if (err) {
        return res.status(401).json({success: false, err});
      }

      if (!user) {
        return res.status(401).json({success: false, err: 'Invalid email address.'});
      }

      // Hash again all the data to compare it with the link
      // The link in invalid when:
      // 2. If the salt is changed, the user has already changed the password
      const data = {
        today: req.body.today,
        userId: user._id,
        password: user.password,
        email: user.email,
      };
      const hash = sha256(JSON.stringify(data), passwordResetKey);

      if (hash !== req.body.hash) {
        return res.status(401).json({success: false, err: 'The link is invalid.'});
      }

      // UPDATE THE PASSWORD HERE
      user.password = req.body.password;

      user.save((err, doc) => {
        if (err) {
          res.status(500).json({
            success: false,
            err: 'Unexpected error during the password reset process: ' + err.message,
          });
          return;
        }

        return res.status(200).json({success: true, msg: 'Password successfully reset!'});
      });
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      err: 'Unexpected error during the password reset process: ' + err.message,
    });
    return;
  }
});

module.exports = router;

var express = require('express');
var redis = require('../databases/redis')

var router = express.Router();

router.get('/search', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/course/:course', function(req, res, next) {
    redis.get(req.params.course, function(err, reply) {
        res.send(reply);
    });
});

module.exports = router;

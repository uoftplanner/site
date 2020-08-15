var express = require('express');
var redis = require('../databases/redis');
var redisearch = require("redredisearch");

var router = express.Router();
var search;

redisearch.createSearch('course', {}, function (err, newSearch) {
    if (err) {
        throw err;
    }

    search = newSearch;
})

router.get('/course/search/:searchQuery', function(req, res, next) {
    // strip non-alphanumeric characters and add * for prefix matching
    var sanitizedQuery = req.params.searchQuery
        .replace(/[\W_]+/g, '') + "*";

    search
        .query(sanitizedQuery)
        .type('direct')
        .end((err, results) => {
            if (err) {
                throw err;
            }

            res.send(results)
        });
});

router.get('/course/:course', function(req, res, next) {
    redis.hgetall(req.params.course, (err, reply) => {
        // TODO: respond with error
        res.send(reply);
    });
});

module.exports = router;

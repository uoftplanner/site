var express = require('express');
var redis = require('../databases/redis');
var redisearch = require('redredisearch');

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
    let sanitizedQuery = req.params.searchQuery
        .replace(/[\W_]+/g, '') + "*";

    search
        .query(sanitizedQuery)
        .end((err, results) => {
            if (err) {
                throw err;
            }

            let parsedResult = [];

            for (let x = 1; x < results.length; x += 2) {
                let currentObj = {};

                for (let field = 0; field < results[x].length; field += 2) {
                    currentObj[results[x][field]] = results[x][field + 1];
                }

                parsedResult.push(currentObj);
            }

            res.send(parsedResult)
        });
});

router.get('/course/:course', function(req, res, next) {
    redis.hgetall(req.params.course, (err, reply) => {
        if (!reply) {
            res.send('{}');
            return;
        }

        // TODO: respond with error
        res.send(reply.json);
    });
});

module.exports = router;

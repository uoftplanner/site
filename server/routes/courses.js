const express = require('express');
const redisearch = require('redredisearch');
const redis = require('../databases/redis');

const router = express.Router();
let search;

redisearch.createSearch('course', {}, (err, newSearch) => {
  if (err) {
    throw err;
  }

  search = newSearch;
});

router.get('/course/search/:searchQuery', (req, res) => {
  // strip non-alphanumeric characters and add * for prefix matching
  const sanitizedQuery = `${req.params.searchQuery.replace(/[\W_]+/g, '')}*`;

  search.query(sanitizedQuery).end((err, results) => {
    if (err) {
      throw err;
    }

    const parsedResult = [];

    for (let x = 1; x < results.length; x += 2) {
      const currentObj = {};

      for (let field = 0; field < results[x].length; field += 2) {
        currentObj[results[x][field]] = results[x][field + 1];
      }

      parsedResult.push(currentObj);
    }

    res.send(parsedResult);
  });
});

router.get('/course/:course', (req, res) => {
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

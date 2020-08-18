var redis = require('redis');
var redisearch = require('redredisearch');
var { Query } = require('redredisearch');
var key = require('../config/key');

let client = redis.createClient({ host: key.redisHost || '127.0.0.1' });

redisearch.setClient(client);

client.on('error', function (error) {
  console.error(error);
});

client.on('connect', function () {
  console.log('Connected to Redis database');
});

// add support to return fields since redredisearch only returns an array of indices
Query.prototype.end = function (fn) {
  let key = this.search.key,
    db = this.search.client,
    query = this.str,
    args;

  args = [key, query, 'RETURN', '2', 'code', 'name'];

  if (this._start !== undefined) {
    args.push('LIMIT', this._start, this._stop);
  }

  db.send_command('FT.SEARCH', args, function (err, resp) {
    if (err) {
      fn(err);
    } else {
      fn(err, resp.slice(1));
    }
  });

  return this;
};

module.exports = client;

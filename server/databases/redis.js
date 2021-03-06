const redis = require('redis');
const redisearch = require('redredisearch');
const {Query} = require('redredisearch');
const credentials = require('../config/key');

const client = redis.createClient({host: credentials.redisHost || '127.0.0.1'});

redisearch.setClient(client);

client.on('error', error => {
  console.error(error);
});

client.on('connect', () => {
  console.log('Connected to Redis database');
});

/* eslint-disable no-underscore-dangle */
// add support to return fields since redredisearch only returns an array of indices
Query.prototype.end = fn => {
  const key = this.search;
  const db = this.search.client;
  const query = this.str;
  const args = [key, query, 'RETURN', '2', 'code', 'name'];

  if (this._start !== undefined) {
    args.push('LIMIT', this._start, this._stop);
  }

  db.send_command('FT.SEARCH', args, (err, resp) => {
    if (err) {
      fn(err);
    } else {
      fn(err, resp.slice(1));
    }
  });

  return this;
};

module.exports = client;

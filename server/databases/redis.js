var redis = require("redis");
var redisearch = require("redredisearch");

let client = redis.createClient();

redisearch.setClient(client);

client.on("error", function(error) {
    console.error(error);
});

client.on("connect", function() {
    console.log("Connected to Redis database");
});

module.exports = client;

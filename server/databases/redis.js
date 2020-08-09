var redis = require("redis");

let client = redis.createClient();

client.on("error", function(error) {
    console.error(error);
});

client.on("connect", function(error) {
    console.log("Connected to Redis database");
});

module.exports = client;

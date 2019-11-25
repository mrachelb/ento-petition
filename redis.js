const redis = require("redis");
const client = redis.createClient(
    process.env.REDIS_URL || { host: "localhost", port: 6379 }
);

//in case Redis throws an error
client.on("error", err => {
    console.log("redis err: ", err);
});

/// -----FOR DEMO PURPOSES ONLY!

// client.setex("name", 120, "rachel");
//promisify is a function we get from 'util' that will automatically promisify
//(that have Node-style error-first callback functions)
const { promisify } = require("util");
//SETEX puts data into redis
exports.setex = promisify(client.setex).bind(client);

// GET pulls or selects data from redis
exports.get = promisify(client.get).bind(client);

// DEL deletes data from redis
exports.del = promisify(client.del).bind(client);

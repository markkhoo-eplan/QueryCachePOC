const SequelizeRedis = require('sequelize-redis');
const redis = require('redis');
const bluebird = require('bluebird');

// Let's promisify Redis
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

// Define your redisClient
const redisClient = redis.createClient({ /* Redis configuration comes here */ });

// Let's start
module.exports = new SequelizeRedis(redisClient);
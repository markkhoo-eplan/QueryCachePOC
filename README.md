# Query Caching POC

## Description
This is a proof of concept for apply query caching to the sequelize ORM using
[sequelize-redis](https://www.npmjs.com/package/sequelize-redis), redis, and bluebird.
The sequelize-redis package provides a wrapper for sequelize models which allows the
use of cached methods. This gives us the flexibility to use regular sequelize queries
or cached sequalize queries in our controllers.

### Modularizing the Wrapper
Preferentially we should put the wrapper in a module to keep the codebase DRY.
The following is the module `/config/cache.js`:
```js
const SequelizeRedis = require('sequelize-redis');
const redis = require('redis');
const bluebird = require('bluebird');

// Let's promisify Redis
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

// Define your redisClient
const redisClient = redis.createClient({ /* Redis configuration comes here */ });

// Export the Wrapper
module.exports = new SequelizeRedis(redisClient);
```

### Example Controller
In this repo we have the **Playground** model and controller. In the `playground.js`
controller we import:
```js
const router = require('express').Router();
const { Playground } = require('../models');
const sequelizeRedis = require('../config/cache');

const PlaygroundModel = sequelizeRedis.getModel(Playground, { ttl: 3 });
```
With `PlaygroundModel` we are using sequelize-redis to wrap the Playground Model. Either 
regular sequelize methdos can be used or the new cached methods:
```js
const id = req.params.id;
const cacheId = `id_${id}`;

// Using Caching to Find by Primary Key
const [dataRes, cacheHit] = await PlaygroundModel.findByPkCached(cacheId, id);

// NOT Using Caching to Find by Primary Key
const data = await PlaygroundModel.findByPk(id);
```
Results for the cached method:
* `dataRes` - regular sequelize response
* `cacheHit` - cache hit indication (boolean)

### Supported Methods
To use chaching methods, add the suffix "Cached" to the regular sequelize methods:
* `find`
* `findOne`
* `findAll`
* `findAndCount`
* `findAndCountAll`
* `findByPk`
* `all`
* `min`
* `max`
* `sum`
* `count`

## Cache Invalidation
Use regular Redis API: 
[`redisClient.del('SampleKey')`](https://github.com/idangozlan/sequelize-redis#cache-invalidation)

## Routes in Repo:
```js
// '/'
```
* returns 'Hello World'

```js
// '/playground'
```
* returns generic json

```js
// '/playgorund/alldata'
```
* returns all data (not cached)

```js
// '/playground/byid/:id'
```
* return data by id (cached)

## Additional Examples
[sequelize-redis-example](https://github.com/idangozlan/sequelize-redis/blob/master/example/app.js)

## Alternative Tools
* [sequelize-transparent-cache](https://github.com/sequelize-transparent-cache/sequelize-transparent-cache)
* [sequelize-redis-cache](https://www.npmjs.com/package/sequelize-redis-cache)
# Query Caching POC

## Description
This is a proof of concept for apply query caching to the sequelize ORM using [sequelize-redis](https://www.npmjs.com/package/sequelize-redis), redis, and bluebird.

## Cache Invalidation
Just use regular Redis API: 
```redisClient.del('SampleKey')```

## Alternative Tools
* [sequelize-transparent-cache](https://github.com/sequelize-transparent-cache/sequelize-transparent-cache)
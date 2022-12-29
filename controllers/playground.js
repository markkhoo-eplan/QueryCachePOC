const router = require('express').Router();
const { Playground } = require('../models');
const sequelizeRedis = require('../config/cache');

// ttl is Time-to-Live in seconds
const PlaygroundModel = sequelizeRedis.getModel(Playground, { ttl: 3 });

router.get('/', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Success',
    data: {}
  });
});

router.get('/alldata', async (req, res) => {
  try {
    // Not Using caching to Find All
    const data = await PlaygroundModel.findAll();

    return res.status(200).json({
      success: true,
      message: 'Success',
      data: data
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: 'Error at db',
      data: err
    });
  }
});

router.get('/byid/:id', async (req, res) => {
  const id = req.params.id;
  const cacheId = `id_${id}`;

  try {
    // Using Caching to find by id
    const [dataRes, cacheHit] = await PlaygroundModel.findByPkCached(cacheId, id);
    console.log('Sequelize Redis Model:', dataRes.toJSON(), cacheHit);

    return res.status(200).json({
      success: true,
      message: 'Success',
      data: dataRes
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: 'Error at db',
      data: err
    });
  }
});

module.exports = router;
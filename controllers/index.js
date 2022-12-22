const router = require('express').Router();

const playgroundRoute = require('./playground');

router.use('/playground', playgroundRoute);

module.exports = router;
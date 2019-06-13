const router = require('express').Router();
const controller = require('./controller.js');

router
  .route('/api/reviews')
  .get(controller.get)


module.exports = router;
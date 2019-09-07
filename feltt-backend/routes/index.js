var express = require('express');
var router = express.Router();
const {
  checkJWT
} = require('../config/jwt')

router.get('/', (req, res) => {
  res.send('up')
})

router.get('/secret', checkJWT, (req, res) => {
  console.log('after next');
  res.send(res.locals.u);
})


module.exports = router;
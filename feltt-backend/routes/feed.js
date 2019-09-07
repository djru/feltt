var express = require('express');
var router = express.Router();
const uuid = require('uuid/v1');
var redis = require("redis"),
    client = redis.createClient();
const {
    checkJWT
} = require('../config/jwt')

router.get('/', checkJWT, (req, res) => {
    client.lrange(res.locals.u.email, 0, 5, (err, r) => {
        console.log(r)
        res.json(r.map(JSON.parse))
    })

})

module.exports = router
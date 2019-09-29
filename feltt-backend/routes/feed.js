const express = require('express');
const router = express.Router();
const uuid = require('uuid/v1');
const redis = require("redis");
const client = redis.createClient();
const {
    checkJWT
} = require('../config/jwt')
const {insert_record_for_table} = require('../config/db')

router.get('/', checkJWT, (req, res) => {
    client.lrange(res.locals.u.email, 0, 5, (err, r) => {
        console.log(r)
        res.json(r.map(JSON.parse))
    })
})

// how to hit
// fetch('http://lvh.me:3000/feed/follow', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({id: 17})})
router.post('/follow', checkJWT, async (req, res) => {
    const follow_data = {
        follower: res.locals.u.id,
        following: parseInt(req.body.id)
    }
    const inserted_json = await insert_record_for_table(follow_data, 'follows')
    res.json(inserted_json)
})

module.exports = router
var redis = require("redis"),
    client = redis.createClient();
module.exports = function (job, done) {
    const job_str = JSON.stringify(job.data)
    const feed_ids = []
    for (let i of feed_ids) {
        client.rpush(i, job_str);
        client.ltrim(i, 0, 99)
    }
    done(null);

    // If the job throws an unhandled exception it is also handled correctly
    throw new Error('some unexpected error');
}
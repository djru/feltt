var Queue = require('bull');
var post_queue = new Queue('post queue', 'redis://127.0.0.1:6379');
const path = require('path');
const this_dir = path.resolve(__dirname);

post_queue.process(this_dir + '/post_process_callback.js');

module.exports = post_queue
const mongoose = require('mongoose');

const Thread = mongoose.model('thread', {
  thread_id: { type: Number, required: true, },
  username: { type: String, required: true },
  body: { type: String, required: true, },
  replies: { type: Array, required: true, },
  timestamp: { type: Number, required: true, },
})

module.exports = Thread;
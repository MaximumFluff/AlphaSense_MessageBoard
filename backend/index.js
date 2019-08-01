const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Channel = require('./models/Channel');
const Thread = require('./models/Thread');
const app = express();
require('dotenv').config();

app.use(cors({ optionSuccessStatus: 200 }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(process.env.MLAB_URI, { useNewUrlParser: true });
let postCounter = 1;

// TODO: Implement caching?
// TODO: Implement unit testing and security

// Return list of available channels
app.get('/channels', (req, res) => {
  Channel.find((err, data) => {
    if (err) return res.status(400);
    else return res.json(data);
  });
});

// Get threads and replies for specified channel
app.get('/messages/:channel', (req, res) => {
  Thread.find({ board: req.params.channel }, (err, data) => {
    if (err) res.status(400);
    else return res.json(data);
  });
});

// Post thread / reply to thread for specified channel
app.put('/:channel', (req, res) => {
  if (!req.body.body) {
    return res.status(400);
  }
  const newThread = new Thread({
    username: !req.body.username ? "Anonymous" : req.body.username,
    body: req.body.body,
    post_number: postCounter,
    timestamp: new Date().getTime(),
    replies: [],
    board: req.params.channel,
  });

  // Increase post count
  postCounter += 1;

  newThread.save((err, data) => {
    if (err) res.status(400);
    else return res.json(data);
  });
});

app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + process.env.PORT);
});

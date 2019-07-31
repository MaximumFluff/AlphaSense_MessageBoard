const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Channel = require('./models/Channel');
const Thread = require('./models/Thread');
const app = express();
require('dotenv').config();

app.use(cors({optionSuccessStatus: 200}));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect(process.env.MLAB_URI, {useNewUrlParser: true});
let postCounter = 1;

// TODO: Remove in memory database, migrate to MongoDB
// TODO: Implement caching?
// TODO: Implement unit testing and security

const database = {
  fit: [],
  technology: [],
  random: [],
  general: [],
}

app.get('/channels', (req, res) => {
  Channel.find((err, data) => {
    if (err) return res.status(400);
    else return res.json(data);
  })
})

app.get('/messages/:channel', (req, res) => {
  if (database[req.params.channel] === undefined) {
    res.status(400);
  }
  else {
    console.log(database);
    res.json(database[req.params.channel]);
  }
})

app.put('/:channel', (req, res) => {
  /*if (database[req.params.channel] === undefined) {
    res.status(400);
  }
  else {
    const newMessage = {
      username: req.body.username,
      body: req.body.body,
      post_number: postCounter,
      timestamp: new Date().getTime(),
    }
    postCounter += 1;
    database[req.params.channel].push(newMessage);
    console.log(database);
    res.json("Message successfully added to channel");
  }*/
  if (!req.body.username && req.body.body) {
    return res.status(400);
  }
  const newMessage = new Thread({
    username: req.body.username,
    body: req.body.body,
    thread_id: postCounter,
    timestamp: new Date().getTime(),
    replies: [],
  })
  newMessage.save((err, data) => {
    if (err) res.status(400);
    else return res.status(200);
  })
})

app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + process.env.PORT);
});
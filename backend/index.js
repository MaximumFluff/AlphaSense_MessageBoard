const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8000;

app.use(cors({optionSuccessStatus: 200}));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const database = {
  fit: [],
  technology: [],
  random: [],
  general: [],
}

app.get('/channels', (req, res) => {
  res.json(Object.keys(database));
})

app.get('/messages/:channel', (req, res) => {
  if (database[req.params.channel] === undefined) {
    res.status(400);
  }
  else {
    res.json(database[req.params.channel]);
  }
})

app.put('/:channel', (req, res) => {
  if (database[req.params.channel] === undefined) {
    res.status(400);
  }
  else {
    const newMessage = {
      username: req.body.username,
      body: req.body.body,
    }
    database[req.params.channel].push(newMessage);
    res.json("Message successfully added to channel");
  }
})

app.listen(PORT, () => {
  console.log('Your app is listening on port ' + PORT);
});
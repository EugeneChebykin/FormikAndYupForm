const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
const jsonParser = bodyParser.json();
const users = [];
const isUserExists = user => users.find(item => item.email === user.email);
const addUser = user => users.push(user);

app.listen(8000, () => console.log('App listening on port 8000'));
app.get('/', (req, res) => res.send('Hello world'));
app.post('/login', jsonParser, (req, res) => {
  if (isUserExists(req.body.user)) {
    res.status(400).send(new Error('User with this email already exists'));
    return null;
  }
  addUser(req.body.user);
  res.send('Successfully added');
});

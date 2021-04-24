const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// this is a "database"
const { users } = require('./users');

app.use(express.json());
app.use(cors());

app.post('/login', (req, res) => {
  if (req.body.username === '' || req.body.password === '') {
    res.status(403).json({ error: 'Please provide username or password' });
    return;
  }

  // query database for user
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === req.body.username
      && req.body.password === users[i].password) {
      res.json({ token: users[i].token });
      return;
    }
  }

  res.status(403).json({ error: 'user not found ' });
});

app.get('/dashboard', (req, res) => {
  let token = req.header('token');
  console.log(token);

  if (token === '') {
    res.status(403).json({ error: 'invalid token' });
    return;
  }

  // query database for user's token
  for (let i = 0; i < users.length; i++) {
    if (users[i].token === token) {
      res.json({ dashboard: users[i].dashboard });
      return;
    }
  }

  res.status(403).json({ error: 'invalid token' });
  return;
})


app.listen(port, () => console.log(`app listening on port ${port}`))

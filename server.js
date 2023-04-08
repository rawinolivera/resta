const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const axios = require('axios');

const port = process.env.PORT || 8000;
const server = express();

server
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/', require('./routes'));

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        server.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }


//oauth

server.use(express.static('static'));

server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/static/index.html'));
});

server.get('/auth', (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`,
  );
});

server.get('/oauth-callback', ({ query: { code } }, res) => {
  const body = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_SECRET,
    code,
  };
  const opts = { headers: { accept: 'application/json' } };
  axios
    .post('https://github.com/login/oauth/access_token', body, opts)
    .then((_res) => _res.data.access_token)
    .then((token) => {
      // eslint-disable-next-line no-console
      console.log('My token:', token);

      res.redirect(`/?token=${token}`);
    })
    .catch((err) => res.status(500).json({ err: err.message }));
});


server.listen(5000);
// eslint-disable-next-line no-console
console.log('App listening on port 5000');


});
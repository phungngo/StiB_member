const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const next = require('next');
const pathMatch = require('path-match');
const app = next({ dev });
const handle = app.getRequestHandler();
const { parse } = require('url');

const apiRoutes = require('./routes.js');

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());
  server.use(session({
    secret: 'super-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }
  }));

  server.use('/api', apiRoutes);

  // Server-side
  const route = pathMatch();

  server.get('/users')
  server.delete('/users/:id')
  server.post('/users')
  server.put('/users/:id')
  server.get('/login/:email')
  server.post('/signup')
  server.get('/users/:id')

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  /* eslint-disable no-console */
  server.listen(3108, (err) => {
    if (err) throw err;
    console.log('Server ready on http://localhost:3108');
  });
});

const express = require('express');
const helmet = require('helmet');

const users = require('./users/userRouter.js');
const server = express();


//custom middleware
const nameCheckMiddleware = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    errorHelper(404, 'Name must be included', res);
    next();
  } else {
    next();
  }
};

function logger(req, res, next) {
  console.log(`${req.method} to ${req.path}`);
  next();
};

server.use(logger);
server.use(helmet());
server.use(express.json());

server.use('/api/users', users);
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

module.exports = server;

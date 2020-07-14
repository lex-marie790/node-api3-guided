const express = require('express'); // importing a CommonJS module
const hubsRouter = require('./hubs/hubs-router.js');
const helmet = require('helmet');
const morgan = require('morgan')

const server = express();

server.use(express.json());
server.use(helmet());
// server.use(lockout);
// server.use(morgan('dev'))
server.use(methodLogger);
server.use(addName);
// server.use(noPass);

server.use('/api/hubs', hubsRouter);



server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

server.delete('/', (req, res)=> {
  res.send('deleted');
})

function methodLogger(req, res, next) {
  console.log(`${req.method} request`);
  next();
}

function addName(req, res, next) {
  req.name = req.name || 'lm';
  next();
}

function lockout(req, req, next) {
  res.status(403).json({message: 'api in maintenance mode'});
}

// write and use custom middleware that returns status code 403 and the message ‘you shall not pass!’ when the seconds on the clock are multiples of 3 and call next() for all other times.

function noPass(req, res, next) {
  const n = date.getSeconds();
  if(Number.isInteger(n/3)){
    next({ code: 403, message: 'you shall not pass', seconds:n})
  } else {
    next()
  }
}

server.use((error, req, res, next) => {
  res,status(400).json({ message: 'there was an error', error });
})

module.exports = server;

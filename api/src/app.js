const express = require('express');
const morgan = require('morgan'); // middleware para peticiones HTTP dregistra las request
const cors = require('cors');
const routes = require('./routes/index');
require('./db.js');

const server = express();

server.name = 'API';
server.use(cors());
server.use(express.json()); // configuro para poder hacer peticiones json para
server.use(morgan('dev')); // llamo a morgan para las request
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

server.use('/', routes);

// Endware para caturar error
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send({message});
  }); 

module.exports = server;
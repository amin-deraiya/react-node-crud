const http = require('http');
const app = require('./app');
const mongoose = require("mongoose");

const port = process.env.PORT || 5000;

const server = http.createServer(app);
mongoose.connect('mongodb://localhost:27017/usersdb');
server.listen(port)
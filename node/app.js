const express = require('express');
const app = express();
const router = express.Router();

const users = require("./api/routes/users");
app.use("/usersList", users);

module.exports = app;
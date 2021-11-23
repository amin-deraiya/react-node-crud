const mongoose = require("mongoose");
// const { Schema } = mongoose;

const user = mongoose.Schema({
    username: String,
    phone: Number,
    website: String,
    company: String,
  },
);

const Users = mongoose.model('users', user);

module.exports = Users;
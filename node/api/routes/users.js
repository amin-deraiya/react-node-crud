const express = require('express');
const app = express();
const Users = require('../../schema/user');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  Users.find(function (err, response) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(response);
    }
  });
});

app.post('/newUser', (req, res, next) => {
  let newUser = new Users(req.body);
  newUser
    .save()
    .then((user) => {
      return res.status(200).send()
    })
    .catch((err) => {
      console.log(err, 'err');
    });
});

app.delete('/deleteUser/:id', (req, res) => {
  Users.findByIdAndRemove(req.params.id, (err)=>{
    if (err) return res.send(500, {error: err});
    return res.status(200).send()
  })
})

app.put("/updateUser/:id", (req, res) => {
  Users.findOneAndUpdate({_id: req.params.id}, req.body, function(err, doc) {
    if (err) return res.send(500, {error: err});
    return res.status(200).send()
  });
})

module.exports = app;

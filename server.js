var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var cors = require('cors');
var prettyjson = require('prettyjson')
var path = require('path')
var eLearn = require('./eLearn')

require("dotenv").config({silent: true});
var DATABASE_URI = process.env.DATABASE_URI
var TOKENSECRET = process.env.SECRET

var app = express()
app.use(cors());
app.use(express.static('build'));
app.use('/elearn', eLearn)

//serves client side assests, html, css and js
//enables react-router to navigate in client-side app
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URI || 'mongodb://<database name>').then(function() {
  var PORT = process.env.PORT || 8080
  app.listen(PORT)
  console.log("Server is listening on ", PORT)
  // var data = [{data: 1, name: 'JP'}, {data: 2, name: 'Ray'}]
  // console.log(prettyjson.render(data))
}).catch(function(error) {
  console.log("Server error: ", error)
})
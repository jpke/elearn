let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let cors = require('cors');
let prettyjson = require('prettyjson');
let path = require('path');
let eLearn = require('./eLearn');

require('dotenv').config({ silent: true });
let DATABASE_URI = process.env.DATABASE_URI;
let TOKENSECRET = process.env.SECRET;

let app = express();
app.use(cors());
app.use(express.static('dist'));
app.use('/elearn', eLearn);
app.use('/test', (req, res, next) => {
  return res.json({ message: 'test successfull' });
  next();
});

//serves client side assests, html, css and js
//enables react-router to navigate in client-side app
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.DATABASE_URI || 'mongodb://<database name>')
  .then(function() {
    let PORT = process.env.PORT || 8080;
    app.listen(PORT);
    console.log('Server is listening on ', PORT);
    // var data = [{data: 1, name: 'JP'}, {data: 2, name: 'Ray'}]
    // console.log(prettyjson.render(data))
  })
  .catch(function(error) {
    console.log('Server error: ', error);
  });

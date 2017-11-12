let express = require('express');
let router = express.Router();
let S3 = require('aws-sdk/clients/s3');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let jwt = require('jsonwebtoken');
let passport = require('passport');
let bcrypt = require('bcryptjs');
let Strategy = require('passport-http-bearer').Strategy;
let fs = require('fs');
let formidable = require('formidable');
let util = require('util');
let path = require('path');

require('dotenv').config({ silent: true });

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

// const awsConfig = AWS.config({
//   accessKeyId: accessKeyId,
//   secretAccessKey: secretAccessKey,
//   region: 'us-east-1'
// });

const s3 = new S3({
  apiVersion: '2006-03-01',
  region: 'us-east-1',
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: 'us-east-1'
  }
});
console.log(s3.config.credentials);

let jsonParser = bodyParser.json();

//create passport strategy to check for valid json web tokens.
passport.use(
  new Strategy(function(token, done) {
    if (token) {
      jwt.verify(token, TOKENSECRET, function(err, decoded) {
        if (err) {
          return done(err);
        }
        return done(null, decoded, { scope: 'all' });
      });
    } else {
      return done(null, false);
    }
  })
);
router.use(passport.initialize());

//parse cookies
router.use(cookieParser());

router.post('/upload', (req, res) => {});
router.get('/download/:file', (req, res, next) => {
  const params = { Bucket: 'elearn.erudome.com', Key: req.params.file };
  const file = require('fs').createWriteStream(
    `${__dirname}/downloads/${req.params.file}`
  );
  s3
    .getObject(params)
    .createReadStream()
    .pipe(file);
  res.json({ message: `${__dirname}/downloads/${req.params.file}` });
});

module.exports = router;

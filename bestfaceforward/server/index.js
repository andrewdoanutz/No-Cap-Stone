const config = require('./config');
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const { chatToken, videoToken, voiceToken } = require('./tokens');
var NodeWebcam = require("node-webcam");
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();


var opts = {
    //Picture related
    width: 1920,
    height: 1080,
    quality: 100,
    //Delay in seconds to take shot
    //if the platform supports miliseconds
    //use a float (0.1)
    //Currently only on windows
    delay: 0,
    saveShots: true, 
    // [jpeg, png] support varies
    // Webcam.OutputTypes
    output: "jpeg",
    //Which camera to use
    //Use Webcam.list() for results
    //false for default device
    device: false,
    // [location, buffer, base64]
    // Webcam.CallbackReturnTypes
    callbackReturn: "base64",
    //Logging
 
    verbose: false
 
};
 
 
//Creates webcam instance
 
var Webcam = NodeWebcam.create( opts );
const now = new Date();
const time = now.getTime();
console.log(time);
var end = NodeWebcam.capture(String(time), opts, function( err, data ) {
  let AWS = require("aws-sdk");
  //used for local development
  AWS.config.update({
    region: "us-east-2",
    //endpoint: "http://localhost:8001",
    endpoint: "https://s3.us-east-2.amazonaws.com",
    // get from google drive
     accessKeyId : "", 
     secretAccessKey: "" 
  });
  //console.log(data);
    const img = './' + String(time) + '.jpg';
    const userId = 10;
    const s3 = new AWS.S3();
    const params = {
      Bucket: 'nocapstone',
      Key: `${userId}.jpg`, // type is not required
      Body: fs.createReadStream(img),
      ACL: 'public-read',
  };

  s3.upload(params, function(err, data2) {
    if (err) {
        throw err;
    }
    console.log(`File uploaded successfully. ${data2.Location}`);
    const request = {
      image: {source: {imageUri:data2.Location}},
      features: [
        {
          "maxResults": 50,
          "type": "LANDMARK_DETECTION"
        },
        {
          "maxResults": 50,
          "type": "FACE_DETECTION"
        },
        {
          "maxResults": 50,
          "type": "OBJECT_LOCALIZATION"
        },
        {
          "maxResults": 50,
          "type": "LOGO_DETECTION"
        },
        {
          "maxResults": 50,
          "type": "LABEL_DETECTION"
        },
        {
          "maxResults": 50,
          "type": "DOCUMENT_TEXT_DETECTION"
        },
        {
          "maxResults": 50,
          "type": "SAFE_SEARCH_DETECTION"
        },
        {
          "maxResults": 50,
          "type": "IMAGE_PROPERTIES"
        },
        {
          "maxResults": 50,
          "type": "CROP_HINTS"
        },
        {
          "maxResults": 50,
          "type": "WEB_DETECTION"
        }
      ],
    };
    client
      .annotateImage(request)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.error(err);
      });
    });
});

console.log(end);
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

const sendTokenResponse = (token, res) => {
  res.set('Content-Type', 'application/json');
  res.send(
    JSON.stringify({
      token: token.toJwt()
    })
  );
};

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.get('/chat/token', (req, res) => {
  const identity = req.query.identity;
  const token = chatToken(identity, config);
  sendTokenResponse(token, res);
});

app.post('/chat/token', (req, res) => {
  const identity = req.body.identity;
  const token = chatToken(identity, config);
  sendTokenResponse(token, res);
});

app.get('/video/token', (req, res) => {
  const identity = req.query.identity;
  const room = req.query.room;
  const token = videoToken(identity, room, config);
  sendTokenResponse(token, res);
});

app.post('/video/token', (req, res) => {
  const identity = req.body.identity;
  const room = req.body.room;
  const token = videoToken(identity, room, config);
  sendTokenResponse(token, res);
});

app.get('/voice/token', (req, res) => {
  const identity = req.body.identity;
  const token = voiceToken(identity, config);
  sendTokenResponse(token, res);
});

app.post('/voice/token', (req, res) => {
  const identity = req.body.identity;
  const token = voiceToken(identity, config);
  sendTokenResponse(token, res);
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);

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
 
  
app.post('/face/analysis',(req,res) => {
  console.log("hi'");
  console.log(req.body.x);
  var link = "https://nocapstone.s3.us-east-2.amazonaws.com/" + req.body.x + ".jpg";
  console.log(link);
  const request = {
    "image": {source: {"imageUri":link}},
    "features": [
      {
          "type": "FACE_DETECTION"
      },
      {
          "type": "LABEL_DETECTION"
      }
  ]
  };
  client
    .annotateImage(request)
    .then(response => {
      let jR = JSON.stringify(response, null, '  ')
      console.log(jR); 
      res.send({response:jsonResponse});
    })
    .catch(err => {
      console.error(err);
    });
})


app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);

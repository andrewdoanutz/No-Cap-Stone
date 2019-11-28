const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const { chatToken, videoToken, voiceToken } = require('./tokens');

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


app.get('/analysis/face',(req,res)=>{


      const request = require('request');
      
      // Replace <Subscription Key> with your valid subscription key.
      const subscriptionKey = 'e1eb00afb764433798f77f15b7ba3848';
      
      // You must use the same location in your REST call as you used to get your
      // subscription keys. For example, if you got your subscription keys from
      // westus, replace "westcentralus" in the URL below with "westus".
      const uriBase = 'https://westus.api.cognitive.microsoft.com/face/v1.0/detect';
      
      const imageUrl =
          'https://nocapstone.s3.us-east-2.amazonaws.com/1.jpg';
      
      
      // Request parameters.
      const params = {
          'returnFaceId': 'true',
          'returnFaceLandmarks': 'false',
          'returnFaceAttributes': 'age,gender,headPose,smile,facialHair,glasses,' +
              'emotion,hair,makeup,occlusion,accessories,blur,exposure,noise'
      };
      
      const options = {
          uri: uriBase,
          qs: params,
          body: '{"url": ' + '"' + imageUrl + '"}',
          headers: {
              'Content-Type': 'application/json',
              'Ocp-Apim-Subscription-Key' : subscriptionKey
          }
      };
      
      request.post(options, (error, response, body) => {
        if (error) {
          console.log('Error: ', error);
          return;
        }
        let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
        console.log('JSON Response\n');
        console.log(jsonResponse);
        res.send(jsonResponse);
      });
});

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);

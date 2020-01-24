const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const axios = require('axios')
const { chatToken, videoToken, voiceToken } = require('./tokens');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);
app.use(cors());

const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');


const analyzeText = (text, res) => {
  

  const toneParams = {
    toneInput: { 'text': text },
    contentType: 'application/json',
  };



  toneAnalyzer.tone(toneParams)
    .then(toneAnalysis => {
      console.log(JSON.stringify(toneAnalysis, null, 2));
      res.set('Content-Type', 'application/json');
      res.send(JSON.stringify({toneAnalysis}))
    })
    .catch(err => {
      console.log('error:', err);
    });
}

const sendTokenResponse = (token, res) => {
  res.set('Content-Type', 'application/json');
  res.send(
    JSON.stringify({
      token: token.toJwt()
    })
  );
};

//Api/transcript takes care of sending in the transcript and sending out analysis
app.get('/api/transcript', (req,res) => {
  //console.log(res.data)
  console.log(req.body)
  const transcript= req.body.transcript;
  analyzeText(transcript, res);

})

app.post('/api/transcript', (req, res) => {
  console.log("Transcript")
  console.log(req.body)
  const transcript= req.body.transcript;

  analyzeText(transcript, res);
  //res.set('Content-Type', 'application/json');
  //res.send(req.data)
})



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



const getWatson = () => {
  try {
    console.log(axios.get('/api/'));
  } catch (error) {
    console.error(error)
  }
}

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);

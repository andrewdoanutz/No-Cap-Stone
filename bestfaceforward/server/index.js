
const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const axios = require('axios')
const { chatToken, videoToken, voiceToken } = require('./tokens');
const vcapServices = require('vcap_services');
const dotenv = require('dotenv');
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();
dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

//const watson = require('watson-developer-cloud');
const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const { IamAuthenticator, IamTokenManager } = require('ibm-watson/auth');

//Speech to Text
const serviceUrl = process.env.SPEECHURL;
// const speechToText = new SpeechToTextV1({
const tokenManager = new IamTokenManager({
  apikey: process.env.SPEECHAPI || '<iam_apikey>'
});

app.get('/api/v1/credentials', async (req, res, next) => {
 try {
  const accessToken = await tokenManager.getToken();
  res.json({
    accessToken,
    serviceUrl,
  });
  } catch (err) {
    next(err);
  }
});



const getSubjects = (text, res) => {
  const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
  const { IamAuthenticator } = require('ibm-watson/auth');

  const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2019-07-12',
    authenticator: new IamAuthenticator({
      apikey: process.env.SUBJECTSAPI,
    }),
    url: 'https://gateway.watsonplatform.net/natural-language-understanding/api',
  });

  const analyzeParams = {
    'text': text,
    'features': {
      // 'categories':{
      //   // 'limit' : 3,
      //   'explanation' : true
      // },
      'concepts' : {
        'limit' : 3
      },

      // 'entities': {
      //   'emotion': true,
      //   'sentiment': true,
      //   'limit': 2,
      // },
      'keywords': {
        // 'emotion': true,
        'sentiment': true,
        'limit': 3
      }
    }
  };

  naturalLanguageUnderstanding.analyze(analyzeParams)
  .then(analysisResults => {
    console.log(JSON.stringify(analysisResults, null, 2));
    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify({analysisResults}))
  })
  .catch(err => {
    console.log('error:', err);
  });
}

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
      res.send({response:jR});
    })
    .catch(err => {
      console.error(err);
    });
})



//Tone Analyzer
const analyzeText = (text, res) => {
  const toneAnalyzer = new ToneAnalyzerV3({
    version: '2019-02-22',
    authenticator: new IamAuthenticator({
      apikey: process.env.TONEAPI,
    }),
    url: 'https://gateway.watsonplatform.net/tone-analyzer/api',
  });

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

app.get('/api/subjects', (req,res) => {
  //console.log(res.data)
  console.log("body of subjects get:", req.body)
  const transcript= req.body.transcript;
  getSubjects(transcript, res);

})

app.post('/api/subjects', (req, res) => {
  console.log("Transcript during getSubjects post:")
  console.log("Body of req in getSubjects:",req.body)
  const transcript= req.body.transcript;
  getSubjects(transcript, res);
})

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

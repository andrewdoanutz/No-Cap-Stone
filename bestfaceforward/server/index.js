const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const axios = require('axios')
const { chatToken, videoToken, voiceToken } = require('./tokens');
const cors = require('cors');
const vcapServices = require('vcap_services');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);
app.use(cors());

//const watson = require('watson-developer-cloud');
const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const { IamAuthenticator, IamTokenManager } = require('ibm-watson/auth');

// on bluemix, enable rate-limiting and force https
// if (process.env.VCAP_SERVICES) {
//   // enable rate-limiting
//   const RateLimit = require('express-rate-limit');
//   app.enable('trust proxy'); // required to work properly behind Bluemix's reverse proxy
//
//   const limiter = new RateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100, // limit each IP to 100 requests per windowMs
//     delayMs: 0 // disable delaying - full speed until the max limit is reached
//   });
//
//   //  apply to /api/*
//   app.use('/api/', limiter);
//
//   // force https - microphone access requires https in Chrome and possibly other browsers
//   // (*.mybluemix.net domains all have built-in https support)
//   const secure = require('express-secure-only');
//   app.use(secure());
// }

// const speechToText = new SpeechToTextV1({
//   authenticator: new IamAuthenticator({
//     apikey: '16z3Ok_HxaBtLL2TKSsvquFxqVeiPUudpdkTY1TECdgr',
//   }),
//   url: 'https://api.us-east.speech-to-text.watson.cloud.ibm.com',
// });

const serviceUrl = process.env.SPEECHURL;
// const speechToText = new SpeechToTextV1({
  const tokenManager = new IamTokenManager({
    apikey: process.env.SPEECHAPI || '<iam_apikey>'
  });
//   url: process.env.SPEECHURL,
//   disableSslVerification: true,
// });



//const authorization = new AuthorizationV1(speechToText.getCredentials());

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

 app.post('/api/v1/credentials', async (req, res, next) => {
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



 // app.post('/api/speech-to-text/token', (req, res, next) => {
 //   authenticator.getToken((err, token) => {
 //     if (err) {
 //       next(err);
 //     } else {
 //       res.set('Content-Type', 'application/json');
 //       res.send(token);
 //     }
 //   });
 // });



const analyzeText = (text, res) => {
  const toneAnalyzer = new ToneAnalyzerV3({
    version: '2019-02-22',
    authenticator: new IamAuthenticator({
      apikey: '16z3Ok_HxaBtLL2TKSsvquFxqVeiPUudpdkTY1TECdgr',
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

//Speech to text
// var sttAuthService = new AuthorizationV1(
//   Object.assign(
//     {
//       apikey: '16z3Ok_HxaBtLL2TKSsvquFxqVeiPUudpdkTY1TECdgr',
//       url: 'https://api.us-east.speech-to-text.watson.cloud.ibm.com'
//     },
//     vcapServices.getCredentials('speech_to_text') // pulls credentials from environment in bluemix, otherwise returns {}
//   )
// );
// app.use('/api/speech-to-text/token', (req, res) => {
//   sttAuthService.getToken(function(err, token) {
//     if (err) {
//       console.log('Error retrieving token: ', err);
//       res.status(500).send('Error retrieving token');
//       return;
//     }
//     res.send(token.token || token);
//   });
// });

// app.listen('/api/speech-to-text/token', function() {
//   console.log(process.env.SPEECH_TO_TEXT_IAM_APIKEY)
//   console.log('Example IBM Watson Speech JS SDK client app & token server live at http://localhost:%s/', port);
// });


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

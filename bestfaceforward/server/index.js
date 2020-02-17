
const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const axios = require('axios')
const { chatToken, videoToken, voiceToken } = require('./tokens');
const cors = require('cors');
const vcapServices = require('vcap_services');
const dotenv = require('dotenv');
const database = require('./db')
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

///WRITING tone analysis to db
app.get('/db/toneAnalysis', (req,res) =>{
  console.log("Tone analysis being passed into DB:", req.body)
  const toneAnalysis = req.body.analysis;
  database.writeToneAnalysis()
})

app.post('/db/toneAnalysis', (req,res) =>{
  console.log("ToneAnalysis written:", req.body)
  const toneAnalysis = req.body.analysis;
  database.writeToneAnalysis()
})

app.get('/db/writeTranscript', (req,res) =>{
  console.log("Transcript being passed into DB:", req.body)
  const toneAnalysis = req.body.question;
  database.writeTranscript()
})

app.post('/db/writeTranscript', (req,res) =>{
  console.log("Transcript written:", req.body["q"],req.body["u"])
  const toneAnalysis = req.body.question;
  database.writeTranscript(req.body["u"], req.body["q"])

})

app.get('/db/writeQuestion', (req,res) =>{
  console.log("Question being passed into DB:", req.body)
  const toneAnalysis = req.body.question;
  database.writeQuestion()
})

app.post('/db/writeQuestion', (req,res) =>{
  console.log("Question written:", req.body["q"],req.body["u"])
  const toneAnalysis = req.body.question;
  database.writeQuestion(req.body["u"], req.body["q"])

})


app.post('/db/resetPractice', (req,res) =>{
  console.log("Reset Practice");
  //const toneAnalysis = req.body.question;

  database.resetPractice(req.body["u"]);
  //database.writeQuestions()
})



//READING tone analysis from db
app.get('/db/readToneAnalysis', (req,res) =>{
  console.log("Tone analysis recieved from DB:", req.body)
  const username = req.body.username;
  database.readToneAnalysis(res,username)
})

app.post('/db/readToneAnalysis', (req,res) =>{
  console.log("Tone analysis recieved from DB:", req.body)
  const username = req.body.username;
  database.readToneAnalysis(res,username)
})

//READING transcript from db
app.get('/db/readTranscript', (req,res) =>{
  console.log("Transcript recieved from DB (get):", req.body)
  const username = req.body.username;
  database.readTranscript(res,username)
})

app.post('/db/readTranscript', (req,res) =>{
  console.log("Transcript recieved from DB (post):", req.body)
  const username = req.body.username;
  database.readTranscript(res,username)
})

//READING questions from db
app.get('/db/readQuestions', (req,res) =>{
  console.log("Questions recieved from DB (get):", req.body)
  const username = req.body.username;
  database.readQuestions(res,username)
})

app.post('/db/readQuestions', (req,res) =>{
  console.log("Questions recieved from DB (post):", req.body)
  const username = req.body.username;
  database.readQuestions(res,username)
})

//CREATING new meeting
app.get('/db/createNewMeeting', (req,res) =>{
  const username = req.body.uname;
  const candidate = req.body.interviewee;
  const id = req.body.id;
  console.log("IDDDDD", id)
  const time = req.body.time
  const date = req.body.date
  database.createNewMeeting(res,username,candidate,id,time,date)
})

app.post('/db/createNewMeeting', (req,res) =>{
  const username = req.body.uname;
  const candidate = req.body.interviewee;
  const id = req.body.id;
  console.log("IDDDDD", id)
  const time = req.body.time
  const date = req.body.date
  database.createNewMeeting(res,username,candidate,id,time,date)
})

app.get('/db/getCandidate', (req,res) =>{
  const meetingID = req.body.meetingID
  database.getSubjects(res, meetingID)
})

app.post('/db/getCandidate', (req,res) =>{
  const meetingID = req.body.meetingID
  database.getSubjects(res, meetingID)
})


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

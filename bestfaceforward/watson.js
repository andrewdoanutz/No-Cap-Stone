const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

const toneAnalyzer = new ToneAnalyzerV3({
  version: '2017-09-21',
  authenticator: new IamAuthenticator({
    apikey: 'M0o5HbUt2oLKXBvYA2hpNeioDKY9AhLxkydJIt98vYhm',
  }),
  url: 'https://gateway.watsonplatform.net/tone-analyzer/api',
});

const text = 'Team, I know that times are tough! Product '
  + 'sales have been disappointing for the past three '
  + 'quarters. We have a competitive product, but we '
  + 'need to do a better job of selling it!';

const toneParams = {
  toneInput: { 'text': text },
  contentType: 'text/plain',
  sentences: false,
};



const tone = toneAnalyzer.tone(toneParams)
  .then(toneAnalysis=> {
     return(JSON.stringify(toneAnalysis, null, 2));

  })
.catch(err => {
  console.log('error:', err);
});

console.log(tone);

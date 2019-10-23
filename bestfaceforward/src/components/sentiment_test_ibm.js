require('dotenv').config();
const readline = require('readline');
const ToneAnalyzerV3 = require('ibm-watson/tone-analyzer/v3');
const { IamAuthenticator } = require('ibm-watson/auth');

const toneAnalyzer = new ToneAnalyzerV3({
  version: '2017-09-21',
  authenticator: new IamAuthenticator({
    apikey: 'ZpQzJCzwFyXMj9EYlLwMpiCbOf6qBmJ6tBGuYDjbJy9Q',
}),
  url: 'https://gateway.watsonplatform.net/tone-analyzer/api',
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

rl.question('Please enter a short paragraph for Watson to analyze...', (text) => {
    
    const toneParams = {
        toneInput: { 'text': text },
        contentType: 'application/json',
    };
    toneAnalyzer.tone(toneParams)
        .then(toneAnalysis => {
            console.log(JSON.stringify(toneAnalysis, null, 2));
        })
        .catch(err => {
            console.log('error:', err);
        });
    
      rl.close();
    });
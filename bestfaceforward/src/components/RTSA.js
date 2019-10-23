//sentiment analysis
import React, { Component } from 'react'
import * as use from '@tensorflow-models/universal-sentence-encoder';

// Load the model.
// var embeddings = use.load().then(model => {
//   // Embed an array of sentences.
//   const sentences = [
//     'Hello.',
//     'How are you?'
//   ];
//   model.embed(sentences).then(embeddings => {
//     // `embeddings` is a 2D tensor consisting of the 512-dimensional embeddings for each sentence.
//     // So in this example `embeddings` has the shape [2, 512].
//     embeddings.print(true /* verbose */);
//   });
// });



export default class RTSA extends Component {






  render() {
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
      contentType: 'application/json',
    };

    toneAnalyzer.tone(toneParams)
      .then(toneAnalysis => {
        console.log(JSON.stringify(toneAnalysis, null, 2));
      })
      .catch(err => {
        console.log('error:', err);
      });

    return (

      <div>

        <div>RTSA</div>
        <div>RTSA</div>
        <div>RTSA</div>
        <div>RTSA</div>
        <div>RTSA</div>
        <div>RTSA</div>
        <div>RTSA</div>
        <div>RTSA</div>
        <div>RTSA</div>
        <div>RTSA</div>
        <div>RTSA</div>
        <div>{this.getSentiment()}</div>

      </div>
    )
  }
}



//WATSON tone analyzer API
















//const {GoogleAuth} = require('google-auth-library');

/**
 * Instead of specifying the type of client you'd like to use (JWT, OAuth2, etc)
 * this library will automatically choose the right client based on the environment.
 */



//GOGOGLE CLOUD
// function quickstart() {
//   // Imports the Google Cloud client library
//   const language = require('@google-cloud/language');
//
//   // Instantiates a client
//   const client = new language.LanguageServiceClient();
//
//   // The text to analyze
//   const text = 'Hello, world!';
//
//   const document = {
//     content: text,
//     type: 'PLAIN_TEXT',
//   };
//
//   // Detects the sentiment of the text
//   client.analyzeSentiment({document: document})
//    .then(results =>{
//      const sentiment = results[0].documentSentiment;
//
//
//
//   console.log(`Text: ${text}`);
//   console.log(`Sentiment score: ${sentiment.score}`);
//   console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
//    })
//    .catch(err=>{
//      console.error('ERROR',err);
//    })
// }

//   const {Storage} = require('@google-cloud/storage');
//
// // Instantiates a client. If you don't specify credentials when constructing
// // the client, the client library will look for credentials in the
// // environment.
// const storage = new Storage();
//
// try {
//   // Makes an authenticated API request.
//   const results = await storage.getBuckets();
//
//   const [buckets] = results;
//
//   console.log('Buckets:');
//   buckets.forEach(bucket => {
//     console.log(bucket.name);
//   });
// } catch (err) {
//   console.error('ERROR:', err);
// }
//}

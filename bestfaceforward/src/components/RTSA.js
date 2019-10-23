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
    const analysis = quickstart();
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
        //<div>analysis</div>

      </div>
    )
  }
}




//const {GoogleAuth} = require('google-auth-library');

/**
 * Instead of specifying the type of client you'd like to use (JWT, OAuth2, etc)
 * this library will automatically choose the right client based on the environment.
 */




function quickstart() {
  // Imports the Google Cloud client library
  const language = require('@google-cloud/language');

  // Instantiates a client
  const client = new language.LanguageServiceClient();

  // The text to analyze
  const text = 'Hello, world!';

  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  // Detects the sentiment of the text
  client.analyzeSentiment({document: document})
   .then(results =>{
     const sentiment = results[0].documentSentiment;



  console.log(`Text: ${text}`);
  console.log(`Sentiment score: ${sentiment.score}`);
  console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
   })
   .catch(err=>{
     console.error('ERROR',err);
   })
}

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

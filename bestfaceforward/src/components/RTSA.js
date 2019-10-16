//sentiment analysis
import React, { Component } from 'react'
import * as use from '@tensorflow-models/universal-sentence-encoder';

// Load the model.
var embeddings = use.load().then(model => {
  // Embed an array of sentences.
  const sentences = [
    'Hello.',
    'How are you?'
  ];
  model.embed(sentences).then(embeddings => {
    // `embeddings` is a 2D tensor consisting of the 512-dimensional embeddings for each sentence.
    // So in this example `embeddings` has the shape [2, 512].
    embeddings.print(true /* verbose */);
  });
});


export default class RTSA extends Component {

  render() {
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
        <div>RTSA</div>

      </div>
    )
  }
}

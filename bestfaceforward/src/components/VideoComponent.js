import React, { Component } from 'react'
import SpeechRecognition from 'react-speech-recognition'
import WAT from './watson';
import {Button} from 'react-bootstrap';
import axios from 'axios'

import '../css/VideoComponent.css';

var ts = ""
var translatedPhrase = ""

class VideoComponent extends Component {
  translate(){
    console.log(`translating...`)
    var googleTranslate = require('google-translate')('AIzaSyCsY_IQPqIt6SAvAymb5CAC0q_qNRMAAj8');
    console.log(ts)
    googleTranslate.translate(ts, 'es', function(err, translation) {
      console.log(translation.translatedText);
      translatedPhrase = translation.translatedText;
      // =>  { translatedText: 'Hallo', originalText: 'Hello', detectedSourceLanguage: 'en' }
    });
  }
  analyzeText(trans) {
    axios.post('http://localhost:3001/api/transcript', trans, { headers: { 'Content-Type': 'application/json', } })
   .then(res => {
     console.log(res);
     console.log(res.data);
   })
  }
  render(){
    const { transcript, resetTranscript, browserSupportsSpeechRecognition } = this.props

    if (!browserSupportsSpeechRecognition) {
      return null
    }
    ts = transcript
    return (
      <div>
        <div>
          <Button className ="mb-2" onClick={resetTranscript}>Reset Transcript</Button>
          <span className="subtitles">{transcript}</span>
        </div>
        <div>
          <Button className ="mb-2" onClick={this.translate}>Translate Transcript</Button>
          <span className="subtitles">{translatedPhrase}</span>
        </div>
        <div>
          <Button onClick={() => this.analyzeText(ts.stringify)}>Analyze Transcript</Button>
        </div>

      </div>
    )
  }
}

export default SpeechRecognition(VideoComponent)

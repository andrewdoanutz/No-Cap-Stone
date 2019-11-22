import React, { Component } from 'react'
import SpeechRecognition from 'react-speech-recognition'
import WAT from './watson';
import {Button} from 'react-bootstrap';

import '../css/VideoComponent.css';

var ts = ""
var translatedPhrase = ""

class VideoComponent extends Component {
  translate(){
    console.log(`translating...`)
    var googleTranslate = require('google-translate')('AIzaSyCsY_IQPqIt6SAvAymb5CAC0q_qNRMAAj8');
    console.log(ts)
    googleTranslate.translate(ts, 'ru', function(err, translation) {
      console.log(translation.translatedText);
      translatedPhrase = translation.translatedText;
      // =>  { translatedText: 'Hallo', originalText: 'Hello', detectedSourceLanguage: 'en' }
    });
   }
  render(){
    const { transcript, resetTranscript, browserSupportsSpeechRecognition } = this.props

    if (!browserSupportsSpeechRecognition) {
      return null
    }
    ts = transcript
    return (
      <div>
        <header>
          <h1>Meeting</h1>
        </header>
        <div>
          <Button onClick={resetTranscript}>Reset Transcript</Button>
          <span className="subtitles">{transcript}</span>
        </div>
        <div>
        <Button onClick={this.translate}>Translate Transcript</Button>
        <span className="subtitles">{translatedPhrase}</span>
        </div>
        <WAT text={transcript}/>
      </div>
    )
  }
}

export default SpeechRecognition(VideoComponent)

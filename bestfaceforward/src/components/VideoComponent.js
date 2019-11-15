import React, { Component } from 'react'
import SpeechRecognition from 'react-speech-recognition'
import VideoChat from './VideoChat';
import WAT from './watson';

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
          <button onClick={resetTranscript}>Reset Transcript</button>
          <span className="subtitles">{transcript}</span>
        </div>
        <div>
        <button onClick={this.translate}>Translate Transcript</button>
        <span className="subtitles">{translatedPhrase}</span>
        </div>
        <WAT text={transcript}/>
      </div>
    )
  }
}

export default SpeechRecognition(VideoComponent)

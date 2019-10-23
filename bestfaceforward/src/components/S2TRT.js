import React, { Component } from 'react'
import SpeechRecognition from 'react-speech-recognition'

var ts = ""
var translatedPhrase = ""
class S2TRT extends Component {

 translate(){
  console.log(`guccidog`)
  var googleTranslate = require('google-translate')('');
  console.log(ts)
  googleTranslate.translate(ts, 'ru', function(err, translation) {
    console.log(translation.translatedText);
    translatedPhrase = translation.translatedText;
    // =>  { translatedText: 'Hallo', originalText: 'Hello', detectedSourceLanguage: 'en' }
  });
 }
  render() {

    const { transcript, resetTranscript, browserSupportsSpeechRecognition } = this.props

    if (!browserSupportsSpeechRecognition) {
      return null
    }
    ts = transcript
    return (
      <div>
        <div>S2TRT</div>
        <div>S2TRT</div>
        <div>S2TRT</div>
        <div>S2TRT</div>
        <div>S2TRT</div>
        <div>S2TRT</div>
        <div>S2TRT</div>
        <div>S2TRT</div>
        <div>S2TRT</div>
        <div>S2TRT</div>
        <div>S2TRT</div>
        <div>
          <button onClick={resetTranscript}>Reset</button>
          <span>{transcript}</span>
        </div>
        <div>
        <button onClick={this.translate}>Translate</button>
        <span>{translatedPhrase}</span>
        </div>
      </div>
    )
  }
}

export default SpeechRecognition(S2TRT)
import React, { Component } from 'react'
import SpeechRecognition from 'react-speech-recognition'

var ts = ""
class S2TRT extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transcript: "",
      resetTranscript: "",
      browserSupportsSpeechRecognition: false
    };
  }

 translate(){
  console.log(`guccidog`)
  ts = "Adjon is a human dog"
  var googleTranslate = require('google-translate')('AIzaSyB8yZoHinIGXbAXAo92QpQib10k93xgz_Y');
  console.log(ts)
  googleTranslate.translate(ts, 'ru', function(err, translation) {
    console.log(translation);
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
        </div>
      </div>
    )
  }
}

export default SpeechRecognition(S2TRT)
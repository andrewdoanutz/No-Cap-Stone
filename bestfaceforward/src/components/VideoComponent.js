import React, { Component } from 'react'
import SpeechRecognition from 'react-speech-recognition'
import WAT from './watson';
import {Button} from 'react-bootstrap';
import axios from 'axios'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,} from 'recharts';

import '../css/VideoComponent.css';

var ts = ""
var translatedPhrase = ""

class VideoComponent extends Component {
  constructor(props){
    super(props)
    this.analysis=null
    this.state = {isClicked: false}
  }

  translate(){
    console.log(`translating...`)
    var googleTranslate = require('google-translate')('AIzaSyCsY_IQPqIt6SAvAymb5CAC0q_qNRMAAj8');
    console.log(ts)
    googleTranslate.translate(ts, 'es', function(err, translation) {
      console.log(translation.translatedText);
      translatedPhrase = translation.translatedText;
    });
  }
  analyzeText = (ev) => {
    ev.preventDefault()
    this.setState ({isClicked:true})

    //Post call to backend
    axios.post('http://localhost:3001/api/transcript', {transcript: ts})
   .then(res => {

     //Gets analysis from backend
     this.analysis = res.data.toneAnalysis.result.document_tone.tones;
     console.log(res.data.toneAnalysis.result.document_tone.tones);
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
          <Button onClick={this.analyzeText}>Analyze Transcript</Button>
        </div>
        {this.state.isClicked ?
          <div className = "centered">
            <BarChart width={730} height={300} data={this.analysis}>
              <XAxis dataKey="tone_name" />
              <YAxis/>
              <Tooltip />
              <Legend />
              <Bar dataKey="score" fill="#8884d8" />
            </BarChart>
          </div> :
           null
        }
      </div>
    )
  }
}

export default SpeechRecognition(VideoComponent)

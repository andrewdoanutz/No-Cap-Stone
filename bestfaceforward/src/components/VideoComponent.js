import React, { Component } from 'react'
//import SpeechRecognition from 'react-speech-recognition'
import {Button} from 'react-bootstrap';
import axios from 'axios'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,} from 'recharts';
import recognizeMic from 'watson-speech/speech-to-text/recognize-microphone';
import '../css/VideoComponent.css';

var ts = ""
var translatedPhrase = ""

class VideoComponent extends Component {
  constructor(props){
    super(props)
    this.analysis=null
    this.state = {isClicked: false, ts: ""}
  }
  textToSpeech(){
    axios.fetch('http://localhost:3001/api/speech-to-text/token')
    .then((response) =>{
        console.log(response);
        //return response.text();
    }).then((token) => {

      console.log(token)
      var stream = recognizeMic({
          token: token,
          objectMode: true, // send objects instead of text
          extractResults: true, // convert {results: [{alternatives:[...]}], result_index: 0} to {alternatives: [...], index: 0}
          format: false // optional - performs basic formatting on the results such as capitals an periods
      });

      /**
       * Prints the users speech to the console
       * and assigns the text to the state.
       */
      stream.on('data',(data) => {
        this.setState({
          ts: data.alternatives[0].transcript
        })

        // console.log(data.alternatives[0].transcript)
      });
      stream.on('error', function(err) {
          console.log(err);
      });
      document.querySelector('#stop').onclick = stream.stop.bind(stream);
    }).catch(function(error) {
        console.log(error);
    });
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

    //ts = transcript
    return (
      <div>
        <div>
          <Button className ="mb-2" onClick={this.textToSpeech}>Start Transcript</Button>
          <span className="subtitles">{this.state.ts}</span>
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

export default VideoComponent;

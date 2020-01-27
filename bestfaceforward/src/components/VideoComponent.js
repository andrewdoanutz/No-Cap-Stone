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
    this.state = {
      isClicked: false,
      text: "",
      token: null,
      listening: false,
      error: null,
      url: null
    }

  }

  fetchToken() {
    return fetch('/api/v1/credentials').then((res) => {
      if (res.status !== 200) {
        throw new Error('Error retrieving auth token');
      }
      console.log(res)
      return res.text();
    }).then((token) => {
      var jsonToken = JSON.parse(token)

      this.setState({token: jsonToken.accessToken})

      console.log(this.state.token)
    }).catch(this.handleError);
  }

  componentDidMount(){
    this.fetchToken()
  }

  handleError = (err, extra) => {
    console.error(err, extra);
    if (err.name === 'UNRECOGNIZED_FORMAT') {
      err = 'Unable to determine content type from file name or header; mp3, wav, flac, ogg, opus, and webm are supported. Please choose a different file.';
    } else if (err.name === 'NotSupportedError' && this.state.audioSource === 'mic') {
      err = 'This browser does not support microphone input.';
    } else if (err.message === '(\'UpsamplingNotAllowed\', 8000, 16000)') {
      err = 'Please select a narrowband voice model to transcribe 8KHz audio files.';
    } else if (err.message === 'Invalid constraint') {
      // iPod Touch does this on iOS 11 - there is a microphone, but Safari claims there isn't
      err = 'Unable to access microphone';
    }
    this.setState({ error: err.message || err });
  }

  stopListening = () => {
   if (this.stream) {
     this.stream.stop();
   }

   this.setState({ text: null, listening: false });
  }

  onClickListener = () => {
    if (this.state.listening) {
      this.stopListening();
      return;
    }

    this.setState({ listening: !this.state.listening });

    const stream = recognizeMic({
      token:this.state.token,
      access_token: this.state.token,
      smart_formatting: true,
      format: true, // adds capitals, periods, and a few other things (client-side)
      objectMode: true
    });

    this.stream = stream;

    stream.on('data', (data) => {
      const { results } = data;

      if (results.length) this.setState({ text: results[0].alternatives[0].transcript });
    });

    stream.on('error', (data) => this.stopListening());
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

  render(){

    //ts = transcript
    return (
      <div>

        <div>
          <Button className ="mb-2" onClick={this.translate}>Translate Transcript</Button>
          <span className="subtitles">{translatedPhrase}</span>
        </div>
        <div>
          <Button color="primary" onClick={this.onClickListener}>
            {this.state.listening ? 'Stop' : 'Start'} Listening
          </Button>
          <div value={this.state.text}> </div>
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

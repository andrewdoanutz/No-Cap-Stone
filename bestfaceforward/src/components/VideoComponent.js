import React, { Component } from 'react'
//import SpeechRecognition from 'react-speech-recognition'
import {Button} from 'react-bootstrap';
import axios from 'axios';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,} from 'recharts';
import recognizeMicrophone from 'watson-speech/speech-to-text/recognize-microphone';
import Transcript from './Transcript';
import TimingView from './Timing';
import '../css/VideoComponent.css';

var ts = ""
var translatedPhrase = ""

class VideoComponent extends Component {
  constructor(props){
    super(props)
    this.state = {
      text: "",
      token: null,
      listening: false,
      error: null,
      serviceUrl: null,
      formattedMessages: []
    }
    this.handleFormattedMessage = this.handleFormattedMessage.bind(this);
    this.getFinalResults = this.getFinalResults.bind(this);
    this.getCurrentInterimResult = this.getCurrentInterimResult.bind(this);
    this.getFinalAndLatestInterimResult = this.getFinalAndLatestInterimResult.bind(this);


  }

  //fetch Token on page load
  componentDidMount(){
    this.fetchToken()
  }

  //post call in order to grab ibm watson api token
  fetchToken() {
    return fetch('/api/v1/credentials').then((res) => {
      if (res.status !== 200) {
        throw new Error('Error retrieving auth token');
      }
      console.log(res)
      return res.text();
    }).then((token) => {
      var jsonToken = JSON.parse(token)
      console.log(jsonToken)
      this.setState({token: jsonToken.accessToken, serviceUrl: jsonToken.serviceUrl})

      console.log(this.state.token)
      console.log(this.state.serviceUrl)
    }).catch(this.handleError);
  }

  //handle error
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

  //stop listening to microphone
  stopListening = () => {
   if (this.stream) {
     this.stream.stop();
   }

   this.setState({ text: "", listening: false });
  }

  //update state of transcript
  updateTranscript(transcript) {
    this.setState((state) => {
      if (transcript!=null){
        return {formattedMessages: state.formattedMessages.concat(transcript)}
      }

    });
  }

  //handle Message to be formatted into transcript
  handleFormattedMessage(msg) {
    const { formattedMessages } = this.state;
    console.log(formattedMessages)
    this.setState({ formattedMessages: formattedMessages.concat(msg) });
  }

  //grab end of sentence result (adds . ? or ! at end )
  getFinalResults() {
   return this.state.formattedMessages.filter(r => r.results
     && r.results.length && r.results[0].final);
  }

  //grab Intermin Results
  getCurrentInterimResult() {
    if (this.state.formattedmessages != []){
      const r = this.state.formattedMessages[this.state.formattedMessages.length - 1];
      if (!r || !r.results || !r.results.length || r.results[0].final) {
        return null;
      }
      return r;
    }

  }

  //Get final and interim in order to show an updating Transcript
  //this will be our message for the end
  getFinalAndLatestInterimResult() {
    const final = this.getFinalResults();
    const interim = this.getCurrentInterimResult();
    if (interim) {
      final.push(interim);
    }
    return final;
  }

  //bind this function to a button
  onClickListener = () => {
    if (this.state.listening) {
      this.stopListening();
      return;
    }
    //switch state of listening
    this.setState({ listening: !this.state.listening });

    //create an audio stream to nodeJS
    const stream = recognizeMicrophone({
      model:'en-US_BroadbandModel',
      accessToken: this.state.token,
      smart_formatting: true,
      format: true, // adds capitals, periods, and a few other things (client-side)
      objectMode: true,
      interim_results: true,
      timestamps: true,
      word_alternatives_threshold: 0.01,
      speaker_labels: false,
      resultsBySpeaker: false,
      speakerlessInterim: false,
      url: this.state.serviceUrl,
    });

    this.stream = stream;

    // stream.on('data', (data) => {
    //   const { results } = data;
    //   var transcript = results[0].alternatives[0].transcript
    //   console.log(transcript)
    //   if (results.length) this.updateTranscript(transcript)
    // });

    stream.on('data', this.handleFormattedMessage);

    stream.recognizeStream.on('end', () => {
      if (this.state.error) {
        console.log("test")
      }
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
    const {token, formattedMessages} = this.state;
    const messages = this.getFinalAndLatestInterimResult();

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
        </div>
        <div>
          <h1>
            <Transcript messages={messages} />
          </h1>
        </div>
        <div>
          <h1>
            <TimingView messages={messages} />
          </h1>
        </div>


      </div>
    )
  }
}

export default VideoComponent;

//To  disable CORS policy in chrome:
  // kill all instances of chrome
  //run on command line: "open -a Google\ Chrome --args --disable-web-security --user-data-dir"

import React, { Component } from 'react'
//import SpeechRecognition from 'react-speech-recognition'
import {Button} from 'react-bootstrap';
import axios from 'axios'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,} from 'recharts';
import recognizeMicrophone from 'watson-speech/speech-to-text/recognize-microphone';
import Transcript from './Transcript';
import '../css/VideoComponent.css';
import Camera from 'react-camera'

var prevTime = 10;
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
      formattedMessages: [],
      date:new Date()
    }
    this.handleFormattedMessage = this.handleFormattedMessage.bind(this);
    this.getFinalResults = this.getFinalResults.bind(this);
    this.getCurrentInterimResult = this.getCurrentInterimResult.bind(this);
    this.getFinalAndLatestInterimResult = this.getFinalAndLatestInterimResult.bind(this);
    this.takePicture = this.takePicture.bind(this);
    this.callBackendAPI = this.callBackendAPI.bind(this);

  }

  componentDidMount(){
    this.fetchToken()
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
    this.takePicture();
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
      console.log(jsonToken)
      this.setState({token: jsonToken.accessToken, serviceUrl: jsonToken.serviceUrl})

      console.log(this.state.token)
      console.log(this.state.serviceUrl)
    }).catch(this.handleError);
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

   this.setState({ text: "", listening: false });
  }

  updateTranscript(transcript) {
    this.setState((state) => {
      if (transcript!=null){
        return {formattedMessages: state.formattedMessages.concat(transcript)}
      }

    });
  }

  handleFormattedMessage(msg) {

    const { formattedMessages } = this.state;
    console.log(formattedMessages)
    this.setState({ formattedMessages: formattedMessages.concat(msg) });
  }

  getFinalResults() {
   return this.state.formattedMessages.filter(r => r.results
     && r.results.length && r.results[0].final);
  }

  getCurrentInterimResult() {

    if (this.state.formattedmessages != []){
      const r = this.state.formattedMessages[this.state.formattedMessages.length - 1];
      if (!r || !r.results || !r.results.length || r.results[0].final) {
        return null;
      }
      return r;
    }


  }

  getFinalAndLatestInterimResult() {
    const final = this.getFinalResults();
    const interim = this.getCurrentInterimResult();
    if (interim) {
      final.push(interim);
    }
    return final;
  }

  onClickListener = () => {
    if (this.state.listening) {
      this.stopListening();
      return;
    }

    this.setState({ listening: !this.state.listening });

    const stream = recognizeMicrophone({
      accessToken: this.state.token,
      smart_formatting: true,
      format: true, // adds capitals, periods, and a few other things (client-side)
      objectMode: true,
      interim_results: false,
      url: this.state.serviceUrl
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

  takePicture(){
    const now = new Date();
    const time = now.getTime();
    var link = "";
    this.camera.capture()
      .then(blob => {
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function(){
          var dataUri = reader.result;
          let AWS = require("aws-sdk");
          //used for local development
          AWS.config.update({
            region: "us-east-2",
            //endpoint: "http://localhost:8001",
            endpoint: "https://s3.us-east-2.amazonaws.com",
            // get from google drive
             accessKeyId : "AKIAJN2JSBZ442ZEYG4A",
             secretAccessKey: "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"
          });
          const type = dataUri.split(';')[0].split('/')[1];
          const base64Data = new Buffer.from(dataUri.replace(/^data:image\/\w+;base64,/, ""), 'base64');

          // Getting the file type, ie: jpeg, png or gif


          const s3 = new AWS.S3();
          const params = {
            Bucket: 'nocapstone',
            Key: `${time}.jpg`, // type is not required
            Body: base64Data,
            ACL: 'public-read',
            ContentEncoding: 'base64', // required
            ContentType: `image/${type}` // required. Notice the back ticks
        };
        console.log(base64Data);

          s3.upload(params, function(err, data) {
            if (err) {
                throw err;
            }
            link = data.Location;

            console.log(`File uploaded successfully. ${data.Location}`);

            });


        }
        prevTime = time;
       //

        //this.callBackendAPI();
        //isReady = false;
        this.img.src = URL.createObjectURL(blob);
        console.log(this.img);
        this.img.onload = () => { URL.revokeObjectURL(this.src); }
        console.log("end");

      }).then(setTimeout(() => this.callBackendAPI(),1000))



  }

  async callBackendAPI(){
    console.log();
    const response = await fetch('/face/analysis',{method: 'POST',headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({"x":prevTime})
    });
    const json = await response.json();
    console.log(json.response);
  };


  render(){
    const {token, formattedMessages} = this.state;
    const messages = this.getFinalAndLatestInterimResult();
    console.log("BOT BOT BOT " + this.props.count);
    return (
      <div>
        <div style={{display:'none'}}>
          <Camera
            style={style.preview}
            ref={(cam) => {
              this.camera = cam;
            }}
          >
          </Camera>
          <img
            style={style.captureImage}
            ref={(img) => {
              this.img = img;
            }}
          />
        </div>
        <div>
          <Button className ="mb-2" onClick={this.translate}>Translate Transcript</Button>
          <span className="subtitles">{translatedPhrase}</span>
        </div>
        <div>
          <Button color="primary" onClick={this.onClickListener}>
            {this.state.listening ? 'Stop' : 'Start'} Listening
          </Button>

        </div>
        <h1>
          {<Transcript messages={messages} />}
        </h1>
      </div>
    )
  }
}

export default VideoComponent;
const style = {
  preview: {
    position: 'relative',
  },
  captureContainer: {
    display: 'flex',
    position: 'absolute',
    justifyContent: 'center',
    zIndex: 1,
    bottom: 0,
    width: '100%'
  },
  captureButton: {
    backgroundColor: '#fff',
    borderRadius: '50%',
    height: 56,
    width: 56,
    color: '#000',
    margin: 20
  },
  captureImage: {
    width: '100%',
  }
};

//To  disable CORS policy in chrome:
  // kill all instances of chrome
  //run on command line: "open -a Google\ Chrome --args --disable-web-security --user-data-dir"

import React, { Component } from 'react'
//import SpeechRecognition from 'react-speech-recognition'
import {Button,Card,Col,Row} from 'react-bootstrap';
import recognizeMicrophone from 'watson-speech/speech-to-text/recognize-microphone';
import Transcript from './Transcript';
import Timing from './Timing';
import Camera from 'react-camera';
import axios from 'axios';

var prevTime = 10;
var ts = ""
var translatedPhrase = ""
var finalResult = ""
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
      date:new Date(),
      r:255,
      g:204,
      b:102,
      status: "neutral",
      videoScores:[],
      numQues:0,
      finalTranscript: ""
    }
    this.handleFormattedMessage = this.handleFormattedMessage.bind(this);
    this.getFinalResults = this.getFinalResults.bind(this);
    this.getCurrentInterimResult = this.getCurrentInterimResult.bind(this);
    this.getFinalAndLatestInterimResult = this.getFinalAndLatestInterimResult.bind(this);
    this.takePicture = this.takePicture.bind(this);
    this.callBackendAPI = this.callBackendAPI.bind(this);
    this.transcriptbackFunction = this.transcriptbackFunction.bind(this);
  }

  componentDidMount(){
    this.fetchToken()

    if (localStorage.getItem("candidate") != 0){
      console.log("this is a candidate");
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
      setTimeout(()=> this.onClickListener(),2000)

    }
    else{
      console.log("this is a recruiter");
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);

  }


  transcriptbackFunction = (childData) => {
    console.log(childData);
    this.setState({finalTranscript:childData});
 }

 async callWriteTranscript(transcription){

  const res = await axios.post('http://localhost:3001/db/writeTranscript', {q:transcription,u: this.props.username})
};


  tick() {


    if(this.state.numQues < this.props.count){
      const messages = this.getFinalAndLatestInterimResult()
      this.onClickListener()
      this.onClickListener()
      this.setState({numQues:this.props.count})
      var merged = [].concat.apply([], finalResult);
      finalResult = "";
      merged = merged.join(" ")
      merged += "@"

      this.callWriteTranscript(merged);

    }
    this.setState({
      date: new Date()

    });

    //setTimeout(()=>this.takePicture(),4);
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

    if (this.state.formattedmessages !== []){
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
    console.log("ONCLICKLISTNER",this.state.listening);
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
      word_alternatives_threshold: 0.01,
      timestamps: true, // set timestamps for each word - automatically turned on by speaker_labels
      // includes the speaker_labels in separate objects unless resultsBySpeaker is enabled
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
             accessKeyId : process.env.REACT_APP_TIM_1,
             secretAccessKey: process.env.REACT_APP_TIM_SECRET
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

            console.log(`File uploaded successfully. ${data.Location}`);
            });


        }
        prevTime = time;
        this.img.src = URL.createObjectURL(blob);
        console.log(this.img);
        this.img.onload = () => { URL.revokeObjectURL(this.src); }
        console.log("end");

      }).then(setTimeout(() => {
        this.callBackendAPI().then(results => {
          try{
            let resJSON=JSON.parse(results['response'])['0']['faceAnnotations']['0']
            let joyScore=this.scoreVideoAnalysis(resJSON['joyLikelihood'])
            let sorrowScore=this.scoreVideoAnalysis(resJSON['sorrowLikelihood'])
            let angerScore=this.scoreVideoAnalysis(resJSON['angerLikelihood'])
            let surpriseScore=this.scoreVideoAnalysis(resJSON['surpriseLikelihood'])
            let totalScore=joyScore-sorrowScore-angerScore-surpriseScore
            if(totalScore>0){
              this.setState({
                r:102,
                g:255,
                b:153,
                status:"positive"
              })
            } else if (totalScore<0){
              this.setState({
                r:255,
                g:102,
                b:102,
                status:"negative"
              })
            } else {
              this.setState({
                r:255,
                g:204,
                b:102,
                status:"neutral"
              })
            }
          } catch(e){
            console.log("error changing indicator: ",e)
          }
        })
      }
      ,1000))
  }
  scoreVideoAnalysis(score){
    if(score==="VERY_UNLIKELY"){
      return 0
    } else if (score==="UNLIKELY"){
      return 1
    } else if (score==="LIKELY"){
      return 2
    } else if (score==="VERY_LIKELY"){
      return 3
    } else {
      console.log("Error in scoring analysis:",score)
      return -1
    }
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
    return json
  };


  render(){
    const messages = this.getFinalAndLatestInterimResult();
    const results = messages.map(msg => msg.results.map((result, i) => (result.alternatives[0].transcript))).reduce((a, b) => a.concat(b), []);

    finalResult = results;
    //console.log(finalResult);
    var merged = [].concat.apply([], finalResult);
    console.log(merged.join(" "))
    console.log("BOT BOT BOT " + this.state.numQues);
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
          {<Timing messages = {messages} />}
        </h1>
        <Card className = "shadow" style={{width:"20%"}}>
          <Card.Body>
            <Card.Text>
              <Row>
                <Col>
                  <div style={{
                    display:"inline-block",
                    borderRadius: "50%",
                    padding:"5%",
                    backgroundColor: `rgba(${ this.state.r }, ${ this.state.g }, ${ this.state.b }, 1)`,
                    width:"5%",
                    height:"5%",}}>
                  </div>
                </Col>
                <Col>
                  <div>{"You look "+this.state.status}</div>
                </Col>
              </Row>
            </Card.Text>
          </Card.Body>
        </Card>
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

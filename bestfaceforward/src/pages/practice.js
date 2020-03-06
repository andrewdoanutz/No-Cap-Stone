import React, { Component } from 'react'
import {Button,Card,Col,Row} from 'react-bootstrap'
import Webcam from "react-webcam";
import Speech from 'speak-tts'
import questions from '../questions.json'
import { ReactMediaRecorder } from "react-media-recorder";
import recognizeMicrophone from 'watson-speech/speech-to-text/recognize-microphone';
import Camera from 'react-camera'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMehBlank, faGrinBeam, faFrown } from '@fortawesome/free-solid-svg-icons'
import Timing from '../components/Timing'

import axios from 'axios'

const videoConstraints = {
  width: 1920,
  height: 1080,
  facingMode: "user"
};
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
var prevTime = 10;

const speech = new Speech()
speech.init({
  voice:'Google UK English Female',
}).then((data) => {
  // The "data" object contains the list of available voices and the voice synthesis params
  console.log("Speech is ready, voices are available", data)
}).catch(e => {
  console.error("An error occured while initializing : ", e)
})



export default class Practice extends Component {
  constructor(props){
    super(props)
    this.state = {
      question: "",
      inds:[],
      videos:[],
      recording: false,
      transcripts:[],
      text: "",
      token: null,
      listening: false,
      error: null,
      serviceUrl: null,
      formattedMessages: [],
      status: "neutral",
      joyScores:[],
      angerScores:[],
      sorrowScores:[],
      surpriseScores:[],
      finalScores:[],
      hesitationCount: 0
    }
    this.handleFormattedMessage = this.handleFormattedMessage.bind(this);
    this.getFinalResults = this.getFinalResults.bind(this);
    this.getCurrentInterimResult = this.getCurrentInterimResult.bind(this);
    this.getFinalAndLatestInterimResult = this.getFinalAndLatestInterimResult.bind(this);
    this.updateHesitation = this.updateHesitation.bind(this);
  }
  //speech stuff
  componentDidMount(){
    this.fetchToken()
    this.timerID = setInterval(
      () => this.tick(),
      5000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  fetchToken() {
    return fetch('/api/v1/credentials').then((res) => {
      if (res.status !== 200) {
        throw new Error('Error retrieving auth token');
      }
      return res.text();
    }).then((token) => {
      var jsonToken = JSON.parse(token)
      this.setState({token: jsonToken.accessToken, serviceUrl: jsonToken.serviceUrl})
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

    this.setState({
      text: "",
      listening: false,
      formattedMessages: []
    });
  }


  handleFormattedMessage(msg) {

    const { formattedMessages } = this.state;
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

    if(this.state.inds.length===4){
      this.stopListening();
    }

    const stream = recognizeMicrophone({
      accessToken: this.state.token,
      smart_formatting: true,
      format: true, // adds capitals, periods, and a few other things (client-side)
      objectMode: true,
      interim_results: false,
      word_alternatives_threshold: 0.01,
      timestamps: true,
      url: this.state.serviceUrl
    });

    this.stream = stream;


    stream.on('data', this.handleFormattedMessage);

    stream.recognizeStream.on('end', () => {
      if (this.state.error) {
        console.log("Stream Error")
      }
    });


    stream.on('error', (data) => this.stopListening());
  }
  //practice stuff
  randomQuestion(){
    const min = 1;
    const max = 33;
    let rand = min + Math.random() * (max - min);
    if(this.state.inds.length===max){
      this.setState({
        question: "There are no questions left."
      }, () => {
        speech.speak({
          text: "There are no questions left.",
        })
      })

    } else {
      while(this.state.inds.includes(Math.round(rand))){
        rand = min + Math.random() * (max - min);
      }
      rand=Math.round(rand)
      if(this.state.inds.length<3){
        this.setState({
          question:questions[rand],
          inds: this.state.inds.concat([rand])
        }, () => {
          speech.speak({
            text: this.state.question,
          })
        })
      } else {
        this.setState({
          question:"",
          inds: this.state.inds.concat([rand])
        }, () => {
        })
      }
    }

  }
  async storeData(data,timestamps,Qs){
    console.log(this.state.finalScores)
    let response = axios.post('http://localhost:3001/db/writeUserInfo', {username: "Practice",transcript:data,questions:Qs,videos:this.state.videos,scores:this.state.finalScores,timestamps:timestamps})
    console.log(response)
    response = await axios.post('http://localhost:3001/db/readUserInfo', {username: "Practice"})
    console.log(response)
  };

  updateHesitation (messages) {
    var timings
    var allTimes = []
    var count = 0
    if (!(Object.keys(messages).length == 0)){
      timings = messages.map(msg => msg.results.map(
        (result) => (result.alternatives[0].timestamps).map(
          (times) => (times))))
      for (const elems of timings){
        for (const j of elems){
          for (const i of j){
            allTimes.push(i)
          }
        }
      }

      for (var i = 1; i< allTimes.length; i++){
        if ((allTimes[i][1]-allTimes[i-1][2])>1){
          count++
        }
      }
    }
    return count
  }

  decodeTranscript(transcript) {
    try {
      // When resultsBySpeaker is enabled, each msg.results array may contain multiple results.
      // The result_index is for the first result in the message,
      // so we need to count up from there to calculate the key.
      // let results = []
      // transcript.forEach((result)=>{
      //   results.push(result.results[0].alternatives[0]['transcript'])
      // })

      let results = ""
      transcript.forEach((result)=>{
        results=(result.results[0].alternatives[0]['transcript'])
      })
      if(results===""){
        results="No speech detected."
      }
      return (results);
    } catch (ex) {
      console.log(ex,transcript);
    }
  }
  decodeTiming(transcript){
    try {
      // When resultsBySpeaker is enabled, each msg.results array may contain multiple results.
      // The result_index is for the first result in the message,
      // so we need to count up from there to calculate the key.
      // let results = []
      // transcript.forEach((result)=>{
      //   results.push(result.results[0].alternatives[0]['transcript'])
      // })

      let results = []
      transcript.forEach((result)=>{
        const temp=result.results[0].alternatives[0]['timestamps']
        if(!temp || temp===[] || temp==='undefined' || temp===""){
          return [1,1]
        } else {
          results.push(temp[1])
          results.push(temp[2])
        }
      })
      if(results.length<2){
        return [1,1]
      } else {
        return (results);
      }

    } catch (ex) {
      console.log(ex,transcript);
    }
  }
  generateReport(){
    if(this.state.videos.length>3){
      this.state.videos.shift()
    }
    if(this.state.transcripts.length>3){
      this.state.transcripts.pop()
    }

    let transcriptText=[]
    let timestamps=[]
    this.state.transcripts.forEach(i =>{
      transcriptText.push(this.decodeTranscript(i))
      timestamps.push(this.decodeTiming(i))
    })
    let Qs = []
    Qs.push(questions[this.state.inds[0]])
    Qs.push(questions[this.state.inds[1]])
    Qs.push(questions[this.state.inds[2]])
    this.storeData(transcriptText,timestamps,Qs).then(()=>{
      console.log("stored")
      setTimeout(()=>{
        return(
          this.props.history.push({
            pathname: "/postAnalysis",
            state: { username: "Practice", source:"practice" }
          })
        )
      },500)

    })
  }
  //video analysis
  async callBackendAPI(){
    const response = await fetch('/face/analysis',{method: 'POST',headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({"x":prevTime})
  });
  const json = await response.json();
  return json
};

tick() {
  this.setState({
    date: new Date()
  });
  this.takePicture();
}

takePicture(){
  const now = new Date();
  const time = now.getTime();
  if(!this.camera){
    return
  }
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
      // console.log(base64Data);
      s3.upload(params, function(err, data) {
        if (err) {
          throw err;
        }
        // console.log(`File uploaded successfully. ${data.Location}`);
      });


    }
    prevTime = time;
    this.img.src = URL.createObjectURL(blob);
    this.img.onload = () => { URL.revokeObjectURL(this.src); }
  }).then(setTimeout(() => {
    this.callBackendAPI().then(results => {
      try{
        let resJSON=JSON.parse(results['response'])['0']['faceAnnotations']['0']
        if(resJSON!=='undefined' && resJSON){
          let joyScore=this.scoreVideoAnalysis(resJSON['joyLikelihood'])
          let sorrowScore=this.scoreVideoAnalysis(resJSON['sorrowLikelihood'])
          let angerScore=this.scoreVideoAnalysis(resJSON['angerLikelihood'])
          let surpriseScore=this.scoreVideoAnalysis(resJSON['surpriseLikelihood'])
          let totalScore=joyScore-sorrowScore-angerScore-surpriseScore
          if(totalScore>0){
            this.setState({
              status:"positive",
              joyScores: this.state.joyScores.concat([joyScore]),
              sorrowScores: this.state.sorrowScores.concat([sorrowScore]),
              angerScores: this.state.angerScores.concat([angerScore]),
              surpriseScores: this.state.surpriseScores.concat([surpriseScore])
            })
          } else if (totalScore<0){
            this.setState({
              status:"negative",
              joyScores: this.state.joyScores.concat([joyScore]),
              sorrowScores: this.state.sorrowScores.concat([sorrowScore]),
              angerScores: this.state.angerScores.concat([angerScore]),
              surpriseScores: this.state.surpriseScores.concat([surpriseScore])
            })
          } else {
            this.setState({
              status:"neutral",
              joyScores: this.state.joyScores.concat([joyScore]),
              sorrowScores: this.state.sorrowScores.concat([sorrowScore]),
              angerScores: this.state.angerScores.concat([angerScore]),
              surpriseScores: this.state.surpriseScores.concat([surpriseScore])
            })
          }
        } else {
          return 0
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
  } else if (score==="POSSIBLE"){
    return 2
  } else if (score==="LIKELY"){
    return 3
  } else if (score==="VERY_LIKELY"){
    return 4
  } else {
    return -1
  }
}

render() {
  const messages = this.getFinalAndLatestInterimResult();
  this.updateHesitation(messages)
  let buttonText="Next Question"
  if(this.state.inds.length===4){
    buttonText="Generate Report"
  } else if(this.state.inds.length===3){
    buttonText="End Interview"
  } else if(this.state.question===""){
    buttonText="Begin Interview"
  }

  let question;
  if (this.state.question!=="" && this.state.inds.length!==4){
    question = this.state.question
  } else if (this.state.inds.length===4){
    question ="Click below to see your results!"
  } else if (this.state.question===""){
    question = "When you're ready, click BEGIN to start practicing!"
  }

  let emoji;
  if (this.state.status=== "neutral"){
    emoji = <h5 style={{ color: "#fdd835" }}> <FontAwesomeIcon icon={faMehBlank} size='4x'/> </h5>
  } else if (this.state.status === "positive"){
    emoji = <h5 style={{ color: "#00c853" }}> <FontAwesomeIcon icon={faGrinBeam} size='4x' /> </h5>
  } else if (this.state.status === "negative"){
    emoji = <h5 style={{ color: "#d32f2f" }}> <FontAwesomeIcon icon={faFrown} size='4x' /> </h5>
  }



  if(this.state.inds.length===5){

    return(
      <div>
        <div>{this.generateReport()}</div>
      </div>
    )

  } else {

    return (
      <ReactMediaRecorder
        video
        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
          <div className = "vertical-center large-vertical-space">
            <Row>
              <Col>
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
              </Col>
            </Row>
            <Row>
              <Col>
                <Row className = "homeBox-practice">
                  <Card className = "py-4 bg-dark" style={{width: "70%"}}>
                    <Webcam
                      audio={false}
                      height={350}
                      screenshotFormat="image/jpeg"
                      width={400}
                      videoConstraints={videoConstraints}
                      />
                  </Card>
                </Row>
                {/* Emoji */}
                <Row className = "homeBox-practice">
                  <Card className = "shadow" style={{width:"15%"}}>
                    <Card.Body>
                      {emoji}
                    </Card.Body>
                  </Card>
                </Row>
              </Col>

              <Col className = "pr-3">
                <Card className = "shadow" style={{width:"80%", borderRadius: "1px", borderColor: "#F74356"}}>
                  <Card.Body>
                    <h1>{question}</h1>
                  </Card.Body>
                </Card>
                <Row className = "centered pt-5" style = {{width: "80%"}}>
                  <Card className = "bg-dark shadow">
                    <Card.Body>
                      <Card.Img src="/bot2.png" />
                  </Card.Body>
                  </Card>
                </Row>
                <Row>
                  <div className="homeBox-practice centered" style = {{width: "78%"}}>
                    <Button variant= "flat" size = "xxl" onClick={()=> {
                        if(this.state.recording===false){
                          startRecording()
                          this.onClickListener()
                          this.setState({
                            recording: true
                          })
                        } else {
                          stopRecording()
                          this.onClickListener()
                          setTimeout(()=>{
                            this.setState({
                              transcripts:this.state.transcripts.concat([this.getFinalAndLatestInterimResult()]),
                              videos: this.state.videos.concat([mediaBlobUrl]),
                              finalScores: this.state.finalScores.concat([[this.state.joyScores,this.state.sorrowScores,this.state.angerScores,this.state.surpriseScores]]),

                            }, () => {
                              // console.log(this.state.finalScores)
                              this.setState({
                                joyScores: [],
                                sorrowScores: [],
                                angerScores: [],
                                surpriseScores: []
                              })
                              // console.log(this.state.videos)
                              startRecording()
                              this.onClickListener()
                            })
                          },500)
                        }
                        this.randomQuestion()
                      }}>{buttonText}</Button>

                    </div>
                </Row>
              </Col>
            </Row>

            </div>
          )}
          />
      )
    }
  }
}

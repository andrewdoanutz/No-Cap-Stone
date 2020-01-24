import React, { Component } from 'react'
import SpeechRecognition from 'react-speech-recognition'
import WAT from './watson';
import {Button} from 'react-bootstrap';
//import ScreenShot from './Screenshot';
import '../css/VideoComponent.css';
import Camera from 'react-camera'
var ts = ""
var translatedPhrase = ""
var isMount = false;
var prevTime = 10;
class VideoComponent extends Component { 
  
  constructor(props){
    super(props);
    this.takePicture = this.takePicture.bind(this);
  }
  componentDidUpdate(){
    this.takePicture();  
  }
  translate(){
    console.log(`translating...`)
    var googleTranslate = require('google-translate')('AIzaSyCsY_IQPqIt6SAvAymb5CAC0q_qNRMAAj8');
    console.log(ts)
    googleTranslate.translate(ts, 'es', function(err, translation) {
      console.log(translation.translatedText);
      translatedPhrase = translation.translatedText;
      // =>  { translatedText: 'Hallo', originalText: 'Hello', detectedSourceLanguage: 'en' }
    });
    
   }
  takePicture(){
    console.log("say cheese");
   /* const response = await fetch('/analysis/face');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    console.log(body);
    return body;*/
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
             accessKeyId : "", 
             secretAccessKey: "" 
          });
          const type = dataUri.split(';')[0].split('/')[1];
          const base64Data = new Buffer.from(dataUri.replace(/^data:image\/\w+;base64,/, ""), 'base64');
      
          // Getting the file type, ie: jpeg, png or gif
          
          const userId = 2;
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
            const response = fetch('/face/analysis',{method: 'POST',headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({"x":time})
            });
            });
            
        }
       // this.callBackendAPI(time);
        prevTime = time;
        this.img.src = URL.createObjectURL(blob);
        console.log(this.img);
        this.img.onload = () => { URL.revokeObjectURL(this.src); } 
        
      })
      
    
  }
   
  callBackendAPI(data){
    console.log(data);
    const response = fetch('/face/analysis',{method: 'POST',headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({"x":data})
    });
  };


  render(){
    const { transcript, resetTranscript, browserSupportsSpeechRecognition } = this.props

    if (!browserSupportsSpeechRecognition) {
      return null
    }
    ts = transcript
    return (
      <div>
        <div style={style.container}>
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
          <Button className ="mb-2" onClick={resetTranscript}>Reset Transcript</Button>
          <span className="subtitles">{transcript}</span>
        </div>
        <div>
          <Button className ="mb-2" onClick={this.translate}>Translate Transcript</Button>
          <span className="subtitles">{translatedPhrase}</span>
        </div>
        <WAT text={transcript}/>
      </div>
    )
  }
}

export default SpeechRecognition(VideoComponent)
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
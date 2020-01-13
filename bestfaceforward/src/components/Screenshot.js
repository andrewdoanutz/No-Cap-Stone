import React, { Component } from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import ImagePreview from './ImagePreview'; // source code : ./src/demo/ScreenshotWithImagePreview/ImagePreview

class Screenshot extends Component {
  constructor (props, context) {
    super(props, context);
    this.state = { dataUri: null, fsRes:null };
    this.onTakePhotoAnimationDone = this.onTakePhotoAnimationDone.bind(this);
  }
 
  onTakePhotoAnimationDone (dataUri) {
    console.log('takePhoto');
    this.setState({ dataUri });
    var image = document.createElement('img');
    image.src = dataUri;
    image.style.height = '1000px';
    image.style.width = '2000px';
    console.log(image);
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
      Key: `${userId}.jpg`, // type is not required
      Body: base64Data,
      ACL: 'public-read',
      ContentEncoding: 'base64', // required
      ContentType: `image/${type}` // required. Notice the back ticks
  };
  
  s3.upload(params, function(err, data) {
    if (err) {
        throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
    });
   // this.callBackendAPI()
    //.then(res => this.setState({ fsRes: res.response }))
    //.catch(err => console.log(err));
    
  }

/*
  callBackendAPI = async () => {
    const response = await fetch('/analysis/face');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

*/
  render () {
    return (
      <div className="Screenshot">
        {
          (this.state.dataUri)
            ?  <span className="subtitles">{this.state.fsRes}</span>
            : <Camera onTakePhotoAnimationDone = {this.onTakePhotoAnimationDone} />
        }
      </div>
      
    );
  }
}
 
export default Screenshot;
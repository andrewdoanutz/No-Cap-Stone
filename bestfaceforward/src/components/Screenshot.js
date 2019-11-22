import React, { Component } from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
 
import ImagePreview from './ImagePreview'; // source code : ./src/demo/ScreenshotWithImagePreview/ImagePreview
import pic from './mn.jpg';
class Screenshot extends Component {
  constructor (props, context) {
    super(props, context);
    this.state = { dataUri: null };
    this.onTakePhotoAnimationDone = this.onTakePhotoAnimationDone.bind(this);
  }
 
  onTakePhotoAnimationDone (dataUri) {
    console.log('takePhoto');
    this.setState({ dataUri });
    var image = document.createElement('img');
    image.src = dataUri;
    console.log(dataUri);
    
    const request = require('request');

    // Replace <Subscription Key> with your valid subscription key.
    const subscriptionKey = 'e1eb00afb764433798f77f15b7ba3848';

    // You must use the same location in your REST call as you used to get your
    // subscription keys. For example, if you got your subscription keys from
    // westus, replace "westcentralus" in the URL below with "westus".
    const uriBase = 'https://westus.api.cognitive.microsoft.com/face/v1.0/detect';

    const imageUrl = pic;
    console.log(image);
       // 'https://upload.wikimedia.org/wikipedia/commons/3/37/Dagestani_man_and_woman.jpg';


    // Request parameters.
    const params = {
        'returnFaceId': 'true',
        'returnFaceLandmarks': 'false',
        'returnFaceAttributes': 'age,gender,headPose,smile,facialHair,glasses,' +
            'emotion,hair,makeup,occlusion,accessories,blur,exposure,noise'
    };

    const options = {
        uri: uriBase,
        qs: params,
        body: '{"url": ' + '"' + imageUrl + '"}',
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key' : subscriptionKey
        }
    };

    request.post(options, (error, response, body) => {
    if (error) {
        console.log('Error: ', error);
        return;
    }
    let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
    console.log('JSON Response\n');
    console.log(jsonResponse);
    });
  }
 
  render () {
    return (
      <div className="Screenshot">
        {
          (this.state.dataUri)
            ? <ImagePreview dataUri={this.state.dataUri} />
            : <Camera onTakePhotoAnimationDone = {this.onTakePhotoAnimationDone} />
        }
      </div>
    );
  }
}
 
export default Screenshot;
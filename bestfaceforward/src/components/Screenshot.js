import React, { Component } from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
 
import ImagePreview from './ImagePreview'; // source code : ./src/demo/ScreenshotWithImagePreview/ImagePreview
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
import React, { Component } from 'react'
import {Form, Button, Col, Row} from 'react-bootstrap'
import Webcam from "react-webcam";

const videoConstraints = {
    width: 1920,
    height: 1080,
    facingMode: "user"
  };
  

export default class Practice extends Component {
  render() {
    return (
      <div>
          <div className="homeBox">
                <Webcam
                audio={false}
                height={300}
                screenshotFormat="image/jpeg"
                width={500}
                videoConstraints={videoConstraints}
                />
        </div>
      </div>
    )
  }
}

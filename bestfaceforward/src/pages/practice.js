import React, { Component } from 'react'
import {Form, Button, Col, Row} from 'react-bootstrap'
import Webcam from "react-webcam";
import Speech from 'speak-tts'
import questions from '../questions.json'

const videoConstraints = {
    width: 1920,
    height: 1080,
    facingMode: "user"
  };
  
export default class Practice extends Component {
    constructor(props){
        super(props)
        this.state = {
            question: "",
            ind:-1
        }
      }
    randomQuestion(ind){
        const min = 1;
        const max = 33;
        let rand = min + Math.random() * (max - min);
        while(rand===1){
            rand = min + Math.random() * (max - min);
        }
        rand=Math.round(rand)
        console.log(rand)
        console.log(questions[rand])
        this.setState({
            question:questions[rand],
            ind:rand
        })
    }
  render() {
      let buttonText="Next Question"
      if(this.state.question===""){
        buttonText="Start Questions"
      }
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
            <Button onClick={this.randomQuestion.bind(this)}>{buttonText}</Button>
            <div>{this.state.question}</div>
        </div>
      </div>
    )
  }
}

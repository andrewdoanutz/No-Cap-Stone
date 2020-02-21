import React, { useState, useCallback } from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Lobby from './Lobby';
import Room from './Room';
import VideoComponent from './VideoComponent'
import {Row, Col} from 'react-bootstrap';

const VideoChat = (props) => {
  const [count, setCount] = useState(0);
  const handleLogout = useCallback(event => {

  }, []);

  const callbackFunction = (childData) => {
      console.log("callback videochat")
      console.log(childData);
      setCount(childData)
  }



  let render = (
      <div>
        <Row>
          <Col>
            <div className = "py-3">
              <header>
                <h1 className = "text-center">Meeting</h1>
              </header>
            </div>
            <Room roomName={props.roomName} token={props.token} handleLogout={handleLogout} parentCallback2 = {callbackFunction}/>
            <VideoComponent count={count}/>
          </Col>
        </Row>
      </div>

    );
  return render;
};

export default VideoChat;

import React, { useState, useCallback } from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Lobby from './Lobby';
import Room from './Room';
import VideoComponent from './VideoComponent'
import {Row, Col} from 'react-bootstrap';

const VideoChat = (props) => {
  const handleLogout = useCallback(event => {

  }, []);

  let render = (
      <div>
        <Row>
          <Col>
            <div className = "py-3">
              <header>
                <h1 className = "text-center">Meeting</h1>
              </header>
            </div>
            <Room roomName={props.roomName} token={props.token} handleLogout={handleLogout} />
            <VideoComponent/>
          </Col>
        </Row>
      </div>

    );
  return render;
};

export default VideoChat;

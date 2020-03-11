import React, { useState, useCallback } from 'react';
import ReactDOM from "react-dom";
import Lobby from './Lobby';
import Room from './Room';
import VideoComponent from './VideoComponent'
import {Row, Col,Card,Button} from 'react-bootstrap';


const VideoChat = (props) => {
  const [count, setCount] = useState(0);
  const [username,setUsername] = useState("");


  const callbackFunction = (childData) => {

      setCount(childData)
  }
  const callbackFunction2 = (childData) => {

      setUsername(childData)
  }

  let render = (

      <div className="vertical-centered" style={{width:"95%"}}>
        <Row className="centered" style={{marginBottom:"5%"}}>
          <Card className = "shadow centered" style={{width:"30%", borderRadius: "1px", borderColor: "#F74356"}}>
            <Card.Body>
              <h1>Interview {props.roomName}</h1>
            </Card.Body>
          </Card>
        </Row>
        <Row>
          <Col>
              <Room roomName={props.roomName} token={props.token} handleLogout={props.handleLogout} parentCallback2 = {callbackFunction}/>
              <VideoComponent count={count} username = {props.name} />
          </Col>
        </Row>
      </div>

    );
  return render;
};

export default VideoChat;

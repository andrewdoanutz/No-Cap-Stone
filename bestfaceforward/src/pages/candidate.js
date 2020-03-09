import React, { Component, useState, useCallback } from 'react';
import {Form, Button, Col, Row, Card, Container} from 'react-bootstrap'
import {Link} from "react-router-dom";
import Lobby from '../components/Lobby';

const Candidate = () => {
  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');
  const [token, setToken] = useState(null);

  const handleUsernameChange = useCallback(event => {
    setUsername(event.target.value);
  }, []);

  const handleRoomNameChange = useCallback(event => {
    setRoomName(event.target.value);
  }, []);

  const handleLogout = useCallback(event => {
    setToken(null);
  }, []);

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault()
      const data = await fetch('/video/token', {
        method: 'POST',
        body: JSON.stringify({
          identity: username,
          room: roomName
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json());
      setToken(data.token);
    },
    []
  );


  return(
    <div className = "background-img">
    <div style={{height:"100vh"}}>
      <Row>
        <Col>
        <Row style={{marginTop: "25vh"}}>
          <Col className = "fill vertical-space align-middle horizontal-center">
            <Card className = "cand-card-2">
              <Card.Body>
                <Link to={{
                  pathname: '/practice'
                }}>
                  <>
                    <Button variant="flat-homepage" size="xxl-homepage">
                      Practice for the Interview
                    </Button>
                  </>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col className = "left-border small-vertical-space">
            <Card className = "cand-card py-4">
              <Card.Body>
                <Lobby
                   username={username}
                   roomName={roomName}
                   handleUsernameChange={handleUsernameChange}
                   handleRoomNameChange={handleRoomNameChange}
                   handleSubmit={handleSubmit}
                 />
               </Card.Body>
             </Card>
          </Col>
        </Row>
        </Col>
        </Row>
    </div>
  </div>
  )

}
export default Candidate;

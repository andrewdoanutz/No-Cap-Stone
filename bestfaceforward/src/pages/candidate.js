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
    <div>
        <Row className = "vertical-space">
          <Col className = "fill vertical-space horizontal-center">
            <Link to={{
              pathname: '/practice'
            }}>
              <>
                <style type="text/css">
                {`
                  .btn-flat {
                    background-color: #007bff;
                    color: white;
                  }

                  .btn-xxl {
                    padding: 1rem 1.5rem;
                    font-size: 1.5rem;
                    font-weight: bold;
                  }
                  `}
                </style>

                <Button variant="flat" size="xxl">
                  Practice for the Interview
                </Button>
              </>
            </Link>
          </Col>
          <Col className = "left-border small-vertical-space">
            <Lobby
               username={username}
               roomName={roomName}
               handleUsernameChange={handleUsernameChange}
               handleRoomNameChange={handleRoomNameChange}
               handleSubmit={handleSubmit}
             />
          </Col>
        </Row>
    </div>
  )

}
export default Candidate;

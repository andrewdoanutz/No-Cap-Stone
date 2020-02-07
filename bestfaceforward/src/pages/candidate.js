import React, { Component, useState, useCallback } from 'react';
import {Form, Button, Col, Row, Card, Container} from 'react-bootstrap'

import '../css/login.css';

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

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();
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
    [roomName, username]
  );

  const handleLogout = useCallback(event => {
    setToken(null);
  }, []);


    return(
      <div>
          <h1 className="homeHead">Welcome Message</h1>
          <Container>
            <Row>
              <Col>
                <div className = "right-border">
                  Sup
                </div>
              </Col>
              <Col>

              </Col>
            </Row>
          </Container>
      </div>
    )

}
export default Candidate;

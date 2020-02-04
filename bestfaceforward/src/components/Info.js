import React, { Component, useState, useCallback} from 'react'
import {Container, Col, Row, Button, Card} from 'react-bootstrap'
import exampleResume from "../images/exampleResume.png"
import Room from './Room';
import VideoComponent from './VideoComponent'

const Info = (props) => {
  const [token, setToken] = useState(null);
  const [previewToken, setPreviewToken] = useState(false);
  const [postviewToken, setPostviewToken] = useState(false);


  const handleClick = useCallback(
    async event => {
      event.preventDefault()
      const data = await fetch('/video/token', {
        method: 'POST',
        body: JSON.stringify({
          identity: props.name,
          room: props.id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json());
      setToken(data.token);
    },
    []
  );


  const handleLogout = useCallback(event => {
   setToken(null);
  }, []);

  let render;
  if(token){
    render = (
      <div>
        <Row>
          <Col>
            <div className = "py-3">
              <header>
                <h1 className = "text-center">Meeting</h1>
              </header>
            </div>
            <Room roomName={props.id} token={token} handleLogout={handleLogout} />
            <VideoComponent/>
          </Col>
        </Row>
      </div>
    );
  }else{
    render = (
      <Container>
        <Row className = "pb-3">
          <Col>
            <h1 className = "pb-3">{props.name}</h1>
            <Row className = "pb-3">
              <Col>
                <Button size="lg" variant="primary" onClick={handleClick}>Join Meeting</Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button size="lg" variant="info">Post-Analysis Report</Button>
              </Col>
            </Row>
          </Col>
          <Col>
            <Card className = "shadow">
              <Card.Header>
                Resume
              </Card.Header>
              <Card.Img variant="bottom" src={exampleResume} />
            </Card>
          </Col>
        </Row>
        {props.id}
      </Container>
    );
  }

  return render;


}
export default Info;

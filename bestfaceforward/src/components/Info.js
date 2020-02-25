import React, { Component, useState, useCallback} from 'react'
import {Container, Col, Row, Button, Card} from 'react-bootstrap'
import exampleResume from "../images/exampleResume.png"
import Room from './Room';
import VideoComponent from './VideoComponent'
import {BrowserRouter as Router, Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideo } from '@fortawesome/free-solid-svg-icons'

const Info = (props) => {
  const [token, setToken] = useState(null);
  const [previewToken, setPreviewToken] = useState(false);
  const [postviewToken, setPostviewToken] = useState(false);
  const [name, setName] = useState("test");
  const [position, setPosition] = useState("");


  const handleClick = useCallback(
    async event => {
      event.preventDefault()
      const data = await fetch('/video/token', {
        method: 'POST',
        body: JSON.stringify({
          identity: name,
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

  let render = (
    <Container>
      <Row className = "pb-3">
        <Col>
          <h1 className = "pb-1">{props.name}</h1>
          <h3 className = "py-3"> Applying for Position: {props.position} </h3>
          <h5 className = "pb-3"> Meeting ID: {props.id} </h5>
          <Row className = "pb-3">
            <Col>

              <Link to={{
                pathname: '/videocall',
                state: {id: props.id, name: name}
              }}>
                <Button variant="flat" size="xxl">
                  <FontAwesomeIcon icon={faVideo}/> &nbsp; Join Meeting
                </Button>
          </Link>



        </Col>
      </Row>
      <Row>
        <Col>
        <Link to={{
          pathname: '/postAnalysis',
          state: {id: props.id, name: props.name}
        }}>
          <>
          <Button size="lg" variant="border">Post-Analysis Report</Button>
            </>
          </Link>
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
</Container>
);


return render;


}
export default Info;

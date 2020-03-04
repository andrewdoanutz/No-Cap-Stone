import React, { useState, useCallback} from 'react'
import {Container, Col, Row, Button, Card} from 'react-bootstrap'
import exampleResume from "../images/exampleResume.png"
import {Link} from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideo } from '@fortawesome/free-solid-svg-icons'

const Info = (props) => {
  const [token, setToken] = useState(null);
  const [name, setName] = useState("test");


  // const handleClick = useCallback(
  //   async event => {
  //     event.preventDefault()
  //     const data = await fetch('/video/token', {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         identity: name,
  //         room: props.id
  //       }),
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     }).then(res => res.json());
  //     setToken(data.token);
  //   },
  //   []
  // );


  const handleLogout = useCallback(event => {
    setToken(null);
  }, []);

  let render = (
    <Container>
      <Row className = "pb-3">
        <Col>
          <h1 className = "pb-1">{props.name}</h1>
          <h4> Applying for: {props.position} </h4>
          <h5 className = "pt-5"> Meeting ID: {props.id} </h5>

          <Row className = "pb-3">
            <Col>

              <Link to={{
                pathname: '/videocall',
                state: {id: props.id, name: name, uname: props.name}

              }}>
              <>
                <Button variant="flat" size="xxl">
                  <FontAwesomeIcon icon={faVideo}/> &nbsp; Join Meeting
                </Button>
              </>
          </Link>



        </Col>
      </Row>
      <Row className = "pb-5">
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
      <Row className = "pt-5">
        <Col>
          <Card className = "shadow">
            <Card.Header>
              Notes
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <span>
                  - UCSB Computer Engineering, GPA: 3.75
                </span><br/>
                <span>
                  - Previous intern at Apple
                </span><br/>
                <span>
                  - Great backend developer and communication skills
                </span><br/>
                <span>
                  - Not as experienced at frontend development
                </span><br/>
                <span>
                  - UCSB Computer Engineering, GPA: 3.75
                </span><br/>
              </Card.Text>

            </Card.Body>
            <Card.Footer className = "text-right">
              <Button size="lg" variant="flat"> Edit </Button>
            </Card.Footer>
          </Card>
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

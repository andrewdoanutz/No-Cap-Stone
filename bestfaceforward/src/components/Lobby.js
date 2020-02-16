import React, {useC} from 'react';
import { Form, Button, Col, Row, Card, Container} from 'react-bootstrap';
import {Link} from "react-router-dom";

const Lobby = (props) => {
  return (
    <div>
      <div className = "homeBox">
        <div className="homeHead">Join Meeting</div>
        <Container>
          <Row className="justify-content-center">
            <Col sm={6}>
              <Card border="primary" className = "shadow">
                <Card.Body>
                  <Form onSubmit={props.handleSubmit}>
                    <div className = "pb-2 center-text">
                      <div className="formField">
                        <Form.Group as={Col}>
                          <Form.Label className="formText" htmlFor="name">Name</Form.Label>
                          <Form.Control
                            type="text"
                            id="field"
                            placeholder= "Enter your name"
                            value={props.username}
                            onChange={props.handleUsernameChange}
                            required
                          />
                        </Form.Group>
                      </div>
                    </div>

                    <div>
                      <div className="formField">
                        <Form.Group as={Col}>
                          <Form.Label className="formText" htmlFor="room">Room ID</Form.Label>
                          <Form.Control
                            type="text"
                            id="room"
                            placeholder="Enter Room ID"
                            value={props.roomName}
                            onChange={props.handleRoomNameChange}
                            required
                          />
                        </Form.Group>
                      </div>
                    </div>
                    <Link to={{
                      pathname: '/videocall',
                      state: {name: props.username, id: props.roomName }
                    }}>
                      <Button  size="lg">
                        Submit
                      </Button>
                    </Link>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Lobby;

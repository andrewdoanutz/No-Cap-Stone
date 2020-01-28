import React from 'react';
import { Form, Button, Col, Row, Card, Container} from 'react-bootstrap';

const Lobby = ({
  username,
  handleUsernameChange,
  roomName,
  handleRoomNameChange,
  handleSubmit
}) => {
  return (
    <div>
      <div className = "homeBox">
        <div className="homeHead">Video</div>
        <Container>
          <Row className="justify-content-center">
          <Col sm={6}>
            <Card>
              <Card.Body>
                  <Form onSubmit={handleSubmit}>
                    <div className = "pb-2 center-text">
                      <div className="formField">
                        <Form.Group as={Col}>
                          <Form.Label className="formText" htmlFor="name">Name</Form.Label>
                          <Form.Control
                            type="text"
                            id="field"
                            placeholder= "Enter your name"
                            value={username}
                            onChange={handleUsernameChange}
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
                            value={roomName}
                            onChange={handleRoomNameChange}
                            required
                          />
                        </Form.Group>
                      </div>
                    </div>
                    <div className = "formButton">
                      <Button size="lg" type="submit">Submit</Button>
                    </div>
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

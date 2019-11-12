import React from 'react';
import {Row, Container, Col, Form, Button} from 'react-bootstrap';

const Lobby = ({
  username,
  handleUsernameChange,
  roomName,
  handleRoomNameChange,
  handleSubmit
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <h2>Enter a Room ID:</h2>
      <div>
        <Form.Label className="formText" htmlFor="name">Name:</Form.Label>
        <div className="formField">
        <Form.Control
          type="text"
          id="field"
          value={username}
          onChange={handleUsernameChange}
          required
        />
        </div>
      </div>

      <div>
        <Form.Label className="formText" htmlFor="room">Room ID:</Form.Label>
        <div className="formField">
        <Form.Control
          type="text"
          id="room"
          value={roomName}
          onChange={handleRoomNameChange}
          required
        />
      </div>
      </div>

      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default Lobby;

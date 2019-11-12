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
      <div className = "pb-2">
        <Form.Label className="formText" htmlFor="name">Name:</Form.Label>
        <div className="formField">
        <Form.Control
          type="text"
          id="field"
          placeholder= "Enter your name"
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
          placeholder="Enter Room ID"
          value={roomName}
          onChange={handleRoomNameChange}
          required
        />
      </div>
      </div>
      <div className = "formButton">
        <Button type="submit">Submit</Button>
      </div>
    </Form>
  );
};

export default Lobby;

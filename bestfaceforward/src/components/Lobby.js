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
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="field"
          value={username}
          onChange={handleUsernameChange}
          required
        />
      </div>

      <div>
        <label htmlFor="room">Room ID:</label>
        <input
          type="text"
          id="room"
          value={roomName}
          onChange={handleRoomNameChange}
          required
        />
      </div>

      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default Lobby;

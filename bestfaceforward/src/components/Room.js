import React, { useState, useEffect } from 'react';
import Video, {LocalDataTrack} from 'twilio-video';
import Participant from './Participant';
import {Row, Container, Col,Button} from 'react-bootstrap';
import '../css/Room.css';
import bro from "../images/mask.png"
const Room = ({ roomName, token, handleLogout }) => {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [blur, setBlur] = useState(false);

  useEffect(() => {
    const participantConnected = participant => {
      setParticipants(prevParticipants => [...prevParticipants, participant]);
    };

    const participantDisconnected = participant => {
      setParticipants(prevParticipants =>
        prevParticipants.filter(p => p !== participant)
      );
    };

    const dataTrack = new Video.LocalDataTrack();

    if (localStorage.getItem('candidate') == 0){
      dataTrack.send("Hello");
    }

    Video.connect(token, {
      name: roomName,
      track: [dataTrack]
    }).then(room => {
      setRoom(room);
      room.on('participantConnected', participantConnected);
      room.on('participantDisconnected', participantDisconnected);
      room.participants.forEach(participantConnected);
    });

    return () => {
      setRoom(currentRoom => {
        if (currentRoom && currentRoom.localParticipant.state === 'connected') {
          currentRoom.disconnect();
          return null;
        } else {
          return currentRoom;
        }
      });
    };
  }, [roomName, token]);

  const remoteParticipants = participants.map(participant => (
    <Participant key={participant.sid} participant={participant} />
  ));

  return (
    <div>
      <Container className = "room">
        <Row>
          <Col>
            <h2>Room: {roomName}</h2>
            <Button className = "mb-2" onClick={handleLogout}>Log out</Button>
            <Button className = "ml-3 mb-2" onClick={ ()=> {
                if(blur===false){
                  setBlur(true)
                } else {
                  setBlur(false)
                }
              }
            }>Blur</Button>
            <div className="local-participant">
              {room ? (
                <div className="container">
                  <img src={bro} className={blur===true ? 'mask' : 'empty'}/>
                  <Participant
                    key={room.localParticipant.sid}
                    participant={room.localParticipant}
                  />
                </div>
              ) : (
                ''
              )}
            </div>
          </Col>
          <Col>
            <h3>Other Participants</h3>
            <div className = "py-4"></div>
            <div className="remote-participants">{remoteParticipants}</div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Room;

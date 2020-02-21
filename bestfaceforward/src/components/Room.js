import React, { useState, useEffect } from 'react';
import Video, {LocalDataTrack} from 'twilio-video';
import Participant from './Participant';
import {Row, Container, Col,Button} from 'react-bootstrap';
import '../css/Room.css';
import bro from "../images/mask.png"

const Room = ({ roomName, token, handleLogout, parentCallback}) => {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [blur, setBlur] = useState(false);
  const [count, setCount] = useState(0);
  const dataTrackPublished = {};

  dataTrackPublished.promise = new Promise((resolve, reject) => {
    dataTrackPublished.resolve = resolve;
    dataTrackPublished.reject = reject;
  });

  const dataTrack = new LocalDataTrack();



  useEffect(() => {

    const participantConnected = participant => {
      setParticipants(prevParticipants => [...prevParticipants, participant]);
    };

    const participantDisconnected = participant => {
      setParticipants(prevParticipants =>
        prevParticipants.filter(p => p !== participant)
      );
    };


    Video.connect(token, {
      name: roomName
    }).then(room => {
      setRoom(room);
      room.on('participantConnected', participantConnected);
      room.on('participantDisconnected', participantDisconnected);
      room.participants.forEach(participantConnected);
      // if (localStorage.getItem("candidate") == 0){
        room.localParticipant.publishTrack(dataTrack);


        room.localParticipant.on('trackPublished', publication => {
          if (publication.track === dataTrack) {
            dataTrackPublished.resolve();
          }
        });

        room.localParticipant.on('trackPublicationFailed', (error, track) => {
          if (track === dataTrack) {
            dataTrackPublished.reject(error);
          }
        });


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



  const handleSend = () => {
    setCount (count+1)
    parentCallback(count)
    room.localParticipant.publishTrack(dataTrack);


    room.localParticipant.on('trackPublished', publication => {
      if (publication.track === dataTrack) {
        dataTrackPublished.resolve();
      }
    });

    room.localParticipant.on('trackPublicationFailed', (error, track) => {
      if (track === dataTrack) {
        dataTrackPublished.reject(error);
      }
    });

    dataTrackPublished.promise.then(() => dataTrack.send(count));
  }

  return (

    <div>
      <Container className = "room">
        <Row>
          <Col>
            <h2>Room: {roomName}</h2>
            <Button className = "mb-2" onClick={handleLogout}>Log out</Button>
            {(localStorage.getItem("candidate") != 0) ? null : <Button className = "mb-2" onClick={handleSend}>Next Question</Button>}
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

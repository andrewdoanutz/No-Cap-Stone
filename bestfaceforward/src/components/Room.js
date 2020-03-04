import React, { useState, useEffect } from 'react';
import Video, {LocalDataTrack} from 'twilio-video';
import Participant from './Participant';
import {Row, Container, Col,Button} from 'react-bootstrap';
import { GridLoader } from "react-spinners";
import {Link} from "react-router-dom";
import bro from "../images/mask.png"

const Room = ({ roomName, token, handleLogout, parentCallback2}) => {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [blur, setBlur] = useState(false);
  const [count, setCount] = useState(0);
  const [num,setNum] = useState(0);
  const dataTrackPublished = {};

  dataTrackPublished.promise = new Promise((resolve, reject) => {
    dataTrackPublished.resolve = resolve;
    dataTrackPublished.reject = reject;
  });

  const dataTrack = new LocalDataTrack();

  const innerCallback = (childData) => {
    console.log("Inner callback")
    console.log(childData);
    setNum(childData)
    parentCallback2(childData)
}



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
        return () => {
          setRoom(currentRoom => {
            if (currentRoom && currentRoom.localParticipant.state === 'connected') {
              currentRoom.disconnect();
              return null;
            } else {
              return currentRoom;
            }
          });
        }

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
    <Participant key={participant.sid} participant={participant} callbackF = {innerCallback} />
  ));


  const handleSend = () => {
    setCount (count+1)
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
        <Col>
        <Row>
          <Col sm={5}>
            <Row>
              <div className="local-participant">

                {room ? (
                  
                  <div className="container">
                    
                    <Participant
                      key={room.localParticipant.sid}
                      participant={room.localParticipant}
                      callbackF = {innerCallback}
                    />
                    
                  </div>
                  ) : (
                    <div className="profiles">
                        <GridLoader
                        size={20}
                        //size={"150px"} this also works
                        color={"#007ed9"}
                        loading={true}
                      />
                    </div>
                  )}
                </div>
              </Row>
              <Row>
              <Link to={{
                pathname: '/postAnalysis',
                state: { username: "Adjon Tahiraj", source:"interviewer"}
              }}>
                <Button variant= "flat" size = "xxl" onClick={handleLogout}>Log Out</Button>
              </Link>
              </Row>
            </Col>
            <Col className="centered" sm={7}>
              <div className="remote-participants">{remoteParticipants}</div>
            </Col>
          </Row>
          <Row>
            <Col sm={5} style={{height:"0%"}}>
              
            </Col>
            <Col sm={7} className="centered">
            {(localStorage.getItem("candidate") != 0) ? null : <Button variant= "flat" size = "xxl" onClick={handleSend}>Next Question</Button>}
            </Col>
          </Row>
        </Col>
      </Container>
    </div>
  );
};

export default Room;

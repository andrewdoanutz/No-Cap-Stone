import React, { useState, useCallback } from 'react';
import {Button, Modal} from 'react-bootstrap';
import Form from 'react-bootstrap/Form'
import Database from '../components/Database'
var Matabase2 = require('../components/Matabase2')

// var Database = require ('../components/Database');

////
function newMeeting({lid}){
  const [show, setShow] = useState(false);
  const [interviewee, setInterviewee] = useState('')
  const [email, setEmail]= useState('')
  const [meetingID, setMeetingID] = useState('')

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChangeInterviewee = useCallback(event =>{
    setInterviewee(event.target.value);
  }, []);
  const handleChangeEmail = useCallback(event =>{
    setEmail(event.target.value);
  }, []);
  const createNewMeeting = useCallback(
    async event =>{
      Matabase2.addMeeting(interviewee,"Adjon").then((result) =>{
        console.log("result of adding meeting:",result);
      });
    handleClose();
  }, [] );

  return (
    <>
    <Button variant="primary" onClick={handleShow}>
      Create New Meeting
    </Button>

    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Meeting</Modal.Title>
      </Modal.Header>
      <Modal.Body>


        <Form>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" value= {interviewee} onChange = {handleChangeInterviewee} placeholder="Enter Inteviewee's first name" />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Interviewee's email</Form.Label>
            <Form.Control type="Email" value = {email} onChange={handleChangeEmail} placeholder="Email" />
          </Form.Group>
        </Form>


      </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={createNewMeeting}>
            Create Meeting
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

module.exports = {
  newMeeting
}

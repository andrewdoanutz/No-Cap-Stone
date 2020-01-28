import React, { useState, useCallback } from 'react';
import {Button, Modal, Form} from 'react-bootstrap';
import Database from '../components/Database'


const newMeeting = ({uname}) =>{
  // this.state= {
  //     interviewee : 0
  //   }
  const [show, setShow] = useState(false);
  const [interviewee, setInterviewee] = useState('')
  const [email, setEmail]= useState('')
  const [meetingID, setMeetingID] = useState('')

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChangeInterviewee = useCallback(event =>{
    setInterviewee(event.target.value);
    // this.setState({interviewee:event.target.value})
    // console.log("interviewe:", interviewee)
    // console.log("setinterviewe:", setInterviewee)
  }, []);
  const handleChangeEmail = useCallback(event =>{
    setEmail(event.target.value);
  }, []);
  const createNewMeeting = useCallback(
    async event =>{
    //   Matabase2.addMeeting(interviewee,"Adjon").then((result) =>{
    //     console.log("result of adding meeting:",result);
    event.preventDefault()
    var id = (Math.floor(Math.random()* (10000000 - 1) + 1)).toString()
    //console.log("username:", uname)
    console.log("Meeting ID: ", id)
    console.log("Email: ", email)
    console.log("interviewe:", interviewee)
    console.log("interviewer:", uname)
    Database.addMeet(id, uname, interviewee);

    handleClose();
  }, [email, interviewee] );

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

export default newMeeting;

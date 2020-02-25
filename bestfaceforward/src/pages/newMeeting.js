import React, { useState, useCallback } from 'react';
import {Button, Modal, Form, Card} from 'react-bootstrap';
import Database from '../components/Database'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserClock } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'



const newMeeting = () =>{
  const [show, setShow] = useState(false);
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [id, setID] = useState('');
  const [uname, setUname] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChangeUname = useCallback(event =>{
    setUname(event.target.value);
  }, []);

  const handleChangeID = useCallback(event =>{
    setID(event.target.value);
  }, []);

  const handleChangeDate = useCallback( event => {
    setDate(event.target.value)
  }, []);

  const handleChangeTime = useCallback( event => {
    setTime(event.target.value)
  }, []);


  const createNewMeeting = useCallback(
    () =>{
      //   Matabase2.addMeeting(interviewee,"Adjon").then((result) =>{
      //     console.log("result of adding meeting:",result);

      var id = Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);
      var time = time
      var date = date
      console.log(id)
      console.log(time)
      console.log(date)
      //Database.addMeet(id, uname, interviewee);
      // axios.post('http://localhost:3001/db/createNewMeeting', {username: uname, id: id, time: time, date:date})
      handleClose();
    }, [] );

    return (
      <div className = "pb-2">
        <Card className = "shadow text-center">
          <Card.Body>
            <Button size="lg" variant="round-red-border" onClick={handleShow}>
              <h4><FontAwesomeIcon icon={faUserClock}/> Schedule Interview</h4></Button>
          </Card.Body>
        </Card>


        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Meeting</Modal.Title>
          </Modal.Header>
          <Modal.Body>


            <Form>
              <Form.Group controlId="formBasicUsername">
                <Form.Label>Candidate Name</Form.Label>
                <Form.Control type="text" value= {uname} onChange = {handleChangeUname} placeholder="Enter Inteviewee's first name" />
              </Form.Group>

              <Form.Group controlId="formBasicDate">
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" value= {date} onChange = {handleChangeDate} placeholder="Enter Date" />
              </Form.Group>

              <Form.Group controlId="formBasicDate">
                <Form.Label>Time</Form.Label>
                <Form.Control type="time" value= {time} onChange = {handleChangeTime} placeholder="Enter Date" />
              </Form.Group>

            </Form>


          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={createNewMeeting}>
              Schedule
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

  export default newMeeting;

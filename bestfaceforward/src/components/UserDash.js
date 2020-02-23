import React, { Component, useState, useCallback} from 'react';
import {Container, Col, Row, Button, Card, ToggleButton} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'


const Userdash = (props) => {
  const [name, setName] = useState("");
  const [id, setID] = useState("");


  var names = [{name: 'Adjon Tahiraj', date: 'Mon, Feb 3 - 9:00am', id: 'A576W'},
              {name: 'Bik Nandy', date: 'Wed, Feb 5 - 10:00am', id: 'A87K2'},
              {name: 'Andrew Doan', date: 'Thurs, Feb 13- 11:00am', id: 'OV3KZ'},
              {name: 'Tim Chang', date: 'Wed, Feb 19 - 1:00pm', id: '4TKLZ'},
              {name: 'Ryan Gormley', date: 'Fri, Feb 28 - 9:00am', id: '10ZIA'}]




    return (
      <div>
        <div className = "dark-scroll">
          <Container>
            <Row>{ names.map(function(candidate){
              return <Col key = {candidate.name}> <h3> {candidate.date} </h3>
                <Card bg="dark" text="white" className = "shadow" style={{marginBottom: "10%"}}>
                <Card.Body>
                  <Row>
                    <Col>
                      <Card.Title><h4>{candidate.name}</h4></Card.Title>
                      <Card.Text>
                        Meeting ID: {candidate.id}
                      </Card.Text>
                    </Col>
                    <Col className="my-auto">
                      <Button variant = "primary" value = {true} onClick = {()=> {setName(candidate.name);
                        setID(candidate.id);
                        props.parentCallback({name: candidate.name, id: candidate.id, isClicked: !props.clicked})}}><h5> View Candidate </h5><FontAwesomeIcon icon={faArrowRight} size='2x'/></Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card></Col>;
            }) }</Row>
          </Container>
        </div>
      </div>
    );


}

export default Userdash;

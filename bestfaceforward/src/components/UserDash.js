import React, { Component, useState, useCallback} from 'react';
import {Container, Col, Row, Button, Card} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'


const Userdash = ({parentCallback}) => {
  const [name, setName] = useState("");


  var names = [{name: 'Adjon Tahiraj', date: 'Mon, Feb 3 - 9:00am', id: 'A576W'},
              {name: 'Bik Nandy', date: 'Wed, Feb 5 - 10:00am', id: 'A87K2'},
              {name: 'Andrew Doan', date: 'Thurs, Feb 13- 11:00am', id: 'OV3KZ'},
              {name: 'Tim Chang', date: 'Wed, Feb 19 - 1:00pm', id: '4TKLZ'}]




    return (
      <div>
        <div className = "scroll">
          <Container>
            <Row>{ names.map(function(candidate){
              return <Col key = {candidate.name}> <h3> {candidate.date} </h3>
                <Card className = "shadow" style={{marginBottom: "10%"}}>
                <Card.Body>
                  <Row>
                    <Col>
                      <Card.Title><h4>{candidate.name}</h4></Card.Title>
                      <Card.Text>
                        Meeting ID: {candidate.id}
                      </Card.Text>
                      <Button size="lg" variant="info">Join Meeting</Button>
                    </Col>
                    <Col className="my-auto">
                      <Button variant = "primary" value = {true} onClick = {()=> {setName(candidate.name); parentCallback(candidate.name)}}><h5> View Candidate </h5><FontAwesomeIcon icon={faArrowRight} size='2x'/></Button>
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

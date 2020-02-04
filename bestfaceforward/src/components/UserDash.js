import React, { Component} from 'react';
import {Container, Col, Row, Button, Card} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

var names = [{name: 'Adjon Tahiraj', date: 'Mon, Feb 3', id: 'A576W'}, {name: 'Bik Nandy', date: 'Wed, Feb 5', id: 'A87K2'}, {name: 'Andrew Doan', date: 'Thurs, Feb 13'
, id: 'OV3KZ'}, {name: 'Tim Chang', date: 'Wed, Feb 19', id: '4TKLZ'}];
var candidateList = names.map(function(candidate){
  return <Col> <h3> {candidate.date} </h3>
    <Card  className = "shadow" style={{marginBottom: "10%"}}>
    <Card.Body>
      <Card.Title><h4>{candidate.name}</h4></Card.Title>
      <Card.Text>
        Meeting ID: {candidate.id}
      </Card.Text>
      <Row>
        <Col>
          <Button size="lg" variant="primary">Join Meeting</Button>
        </Col>
        <Col>
          <Button variant = "primary"><h5> View Candidate </h5><FontAwesomeIcon icon={faArrowRight} size='2x'/></Button>
        </Col>

      </Row>
    </Card.Body>
  </Card></Col>;
})

export default class Userdash extends Component {

  render() {
    return (
      <div>
        <div className = "scroll">
          <Container>
            <Row>{ candidateList }</Row>
          </Container>
        </div>
      </div>
    );
  }

}

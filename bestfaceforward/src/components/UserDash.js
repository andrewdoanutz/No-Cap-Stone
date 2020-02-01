import React, { Component} from 'react';
import {Container, Col, Row, Button, Card} from 'react-bootstrap'

var names = ['Adjon', 'Bik', 'Andrew', 'Tim', 'Ryan', 'Jon Snow'];
var namesList = names.map(function(name){
  return <Col> <h3>Wed, Jan 13 </h3>
    <Card  className = "shadow" style={{marginBottom: "10%"}}>
    <Card.Body>
      <Card.Title><h4>{name}</h4></Card.Title>
      <Card.Text>
        Some Info Here
      </Card.Text>
      <Row>
        <Col>
          <Button size="lg" variant="primary">Join Meeting</Button>
        </Col>
        <Col>
          <Button variant = "secondary">View Candidate</Button>
        </Col>
        <Col>
          <Button variant = "info" >Post-interview analysis</Button>
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
            <Row>{ namesList }</Row>
          </Container>
        </div>
      </div>
    );
  }

}

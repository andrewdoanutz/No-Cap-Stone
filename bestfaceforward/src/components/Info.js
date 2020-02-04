import React, { Component, useState, useCallback} from 'react'
import {Container, Col, Row, Button, Card} from 'react-bootstrap'
import exampleResume from "../images/exampleResume.png"


const Info = (props) => {


  return (
    <Container>
      <Row className = "pb-3">
        <Col>
          <h1 className = "pb-3">{props.name}</h1>
          <Row className = "pb-3">
            <Col>
              <Button size="lg" variant="primary">Join Meeting</Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button size="lg" variant="info">Post-Analysis Report</Button>
            </Col>
          </Row>
        </Col>
        <Col>
          <Card className = "shadow">
            <Card.Header>
              Resume
            </Card.Header>
            <Card.Img variant="bottom" src={exampleResume} />
          </Card>
        </Col>
      </Row>
      {props.id}
    </Container>
  )


}
export default Info;

import React, { Component, useState, useCallback} from 'react'
import {Container, Col, Row, Button, Card} from 'react-bootstrap'


const Info = (props) => {


  return (
    <Container>
      <Row>
        {props.name}
      </Row>
      {props.id}
    </Container>
  )


}
export default Info;

import React from 'react'
import {Container, Col, Row, Button, Card} from 'react-bootstrap'


export default class Info extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <Container>
        <Row>
          {this.props.notes}
        </Row>
        {this.props.resume}
      </Container>
    )
  }

}

import React, { Component } from 'react';
import Cookies from 'universal-cookie';
// import Card from "react-bootstrap/Card";
import {Button} from 'react-bootstrap';
import
  Card, {CardImg, CardText, CardBody,
  CardTitle, CardSubtitle}
 from 'react-bootstrap/Card';
 import { Container, Row, Col } from 'reactstrap';



let cookies = new Cookies();
export default class Dashboard extends Component {


// JoinMeeting(){
//   console.log("clicked");
// }
  // const handleSubmit = useCallback(
  //   async event => {
  //     event.preventDefault();
  //     const data = await fetch('/video/token', {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         identity: username,
  //         room: roomName
  //       }),
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     }).then(res => res.json());
  //     setToken(data.token);
  //   },
  //   [roomName, username]
  // );


  render() {
    console.log(cookies.get('login'));
    let username = "Ryan";
    let roomName = "1";
    return (
      <div>
        <div>Dashboard</div>
        <div>Dashboard</div>
        <div>Dashboard</div>
        <div>Dashboard</div>
        <div>Dashboard</div>
        <Container>
          <Row>
            <Col><Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Meeting 1</Card.Title>
                <Card.Text>
                Coding interview with intern Adjon Tahiraj
                </Card.Text>
                <Button variant="primary">Join Meeting</Button>
              </Card.Body>
            </Card></Col>
            <Col><Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Meeting 2</Card.Title>
                <Card.Text>
                Phone interview with potential new frontend designer Terrell
                </Card.Text>
                <Button variant="primary">Join Meeting</Button>
              </Card.Body>
            </Card></Col>
          </Row>
        </Container>




      </div>
    )
  }
}

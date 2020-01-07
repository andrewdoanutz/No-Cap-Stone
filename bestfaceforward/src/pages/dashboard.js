import React, { Component,useState, useCallback } from 'react';
import Cookies from 'universal-cookie';
// import Card from "react-bootstrap/Card";
import {Button} from 'react-bootstrap';
import
  Card, {CardImg, CardText, CardBody,
  CardTitle, CardSubtitle}
 from 'react-bootstrap/Card';
 import { Container, Row, Col } from 'reactstrap';
 import Room from './../components/Room';
 import VideoComponent from './../components/VideoComponent'
 import Meetings from './../components/Meetings'


let cookies = new Cookies();

export default class Dashboard extends Component {
  render() {
    console.log(cookies.get('login'));
      return (
          <div className="homebox">
              <Row>
                  <Col>
                      <Meetings/>
                  </Col>
              </Row>
          </div>
      )
  }
}

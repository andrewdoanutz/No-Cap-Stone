import React, { Component,useState, useCallback } from 'react';
import Cookies from 'universal-cookie';
import {Button} from 'react-bootstrap';
import
  Card, {CardImg, CardText, CardBody,
  CardTitle, CardSubtitle}
 from 'react-bootstrap/Card';
 import { Container, Row, Col } from 'reactstrap';
 import Room from './../components/Room';
 import VideoComponent from './../components/VideoComponent'
 import Meetings from './../components/Meetings'
 import NewMeeting from './newMeeting'
 import Database from '../components/Database'



let cookies = new Cookies();




export default class Dashboard extends Component {
  state= {
    newMeetingID :0
  }

  constructor(){
    super();
  }

  render() {
  //console.log("here",Database.getNewMeetingID());
    console.log("Cookies",cookies.get('login'));
      return (
          <div className="homebox">
              <Row>
                  <Col>
                      <Meetings username={cookies.get('login')}/>
                  </Col>
              </Row>
              <Row>
                 <NewMeeting/>
              </Row>
          </div>
      )
  }
}

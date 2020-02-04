import React, { Component,useState, useCallback } from 'react';
import Cookies from 'universal-cookie';

import {Button} from 'react-bootstrap';
import
  Card, {CardImg, CardText, CardBody,
  CardTitle, CardSubtitle}
 from 'react-bootstrap/Card';
import { Container, Row, Col } from 'react-bootstrap';
import Room from './../components/Room';
import VideoComponent from './../components/VideoComponent'
import Meetings from './../components/Meetings'
import Userlist from './../components/Userlist'
import Userdash from './../components/Userdash'
import Database from '../components/Database'
import NewMeeting from './newMeeting'
import CalendarView from '../components/Calendar'
import Info from '../components/Info'
import "../css/login.css";


let cookies = new Cookies();




export default class Dashboard extends Component {
  constructor(){
    super();
    this.state = {
      previewToken : false,
      clicked: false,
      name: ""
    }
  }

  callbackFunction = (childData) => {
      this.setState({name: childData})
  }


  render() {
    // console.log("here",this.state.newMeetingID);
    console.log("Cookies",cookies.get('login'));
      return (
        <div className="homebox">
          <Row>
            <Col xs={3} style={{marginLeft: "10px", marginTop: "10px"}}>
              <Card className = "shadow">
                <Card.Body>
                  {this.state.name}
                  <Userdash parentCallback = {this.callbackFunction}/>
                </Card.Body>
              </Card>

            </Col>
            <Col xs={8} style={{marginTop: "10px"}}>
              <Card  className = "shadow">
                <Card.Body >
                  <h4> <CalendarView/> </h4>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col className="padding">
              <div>
                <NewMeeting uname = {cookies.get('login')}/>
              </div>
            </Col>
          </Row>

        </div>
      )
  }
}

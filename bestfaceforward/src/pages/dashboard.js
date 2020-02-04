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
import "../css/login.css";


let cookies = new Cookies();




export default class Dashboard extends Component {


  constructor(){
    super();
    this.state = {
      previewToken : false
    }
  }
    ///BELOW IS ATTEMPT TO GENERATE NEW MEETING ID USING PROMISES
    ///AND FUNCTION DATABASE.getNewMeetingID
    ///PLEASE KEEP FOR REFERENCE

  //   this.state= {
  //     newMeetingID : 1
  //   }
  //   var promise = new Promise ((resolve,reject) => {
  //     // let newMeetingID = '';
  //     Database.getNewMeetingID()
  //     .then(id => this.setState({newMeetingID:id}),
  //     resolve(this.state.newMeetingID)
  //     // console.log("returned value:", id)
  //   )
  //     .catch(err => console.log(err))
  //     // if(this.state.newMeetingID!=1){
  //     //   resolve(this.state.newMeetingID);
  //     // }
  //     // else{
  //     //   reject(Error("promise rejected"))
  //     // }
  //   });
  //   promise.then(result=>{
  //     console.log("result:",result)
  //     this.setState({newMeetingID:result})
  //   },  function(error) {
  //     console.log("promise returned error:", error)
  //   });
  // }
  //
  // // componenetWillMount(){
  // //
  // // }

  render() {
    // console.log("here",this.state.newMeetingID);
    console.log("Cookies",cookies.get('login'));
      return (
        <div className="homebox">
          <Row>
            <Col xs={3} style={{marginLeft: "10px", marginTop: "10px"}}>
              <Card className = "shadow">
                <Card.Body>
                  <Userdash/>
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

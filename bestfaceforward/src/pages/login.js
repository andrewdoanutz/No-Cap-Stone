import React, { Component } from 'react';
import {Form, Button, Col, Row} from 'react-bootstrap'
import VideoChat from '../components/VideoChat.js'
import Cookies from 'universal-cookie';

import '../css/login.css';
let cookies = new Cookies();

export default class Login extends Component {

  constructor() {
    super()
    this.username = React.createRef();
    this.password = React.createRef();
    this.meetingID = React.createRef();
    this.screenName = React.createRef();
    this.errorMessage="dada"

  }
  state={
    showError:false
  }
  UPLoginPressed(){
    if(this.username.current.value!=="test" || this.password.current.value!=="test"){
      this.errorMessage="Wrong Username or Password"
      this.setState({
        showError:true
      })
    } else {
      cookies.set('login', 'testUserName', { path: '/' });
      this.props.history.push('/dashboard')
    }
  }

  KNLoginPressed(){
    if(this.meetingID.current.value!=="test" || this.screenName.current.value===""){
      if(this.meetingID.current.value!=="test"){
        this.errorMessage="Invalid Meeting ID"
      } else{
        this.errorMessage="Enter a Screen Name"
      }
      this.setState({
        showError:true
      })
    } else {
      this.props.history.push('/videocall')
    }
  }
  render() {
    return(
      <div>
        <div className="homeBox">
          <div className="homeHead">Login</div>
          <Row>
          <Col>
            <Form>
              <Form.Group controlId="formBasicEmail" as={Col}>
                <Form.Label className="formText">Username</Form.Label>
                <div className="formField">
                  <Form.Control type="username" placeholder="Enter username" ref={this.username}/>
                </div>
              </Form.Group>
              <Form.Group controlId="formBasicPassword" as={Col}>
                <Form.Label className="formText">Password</Form.Label>
                <div className="formField">
                  <Form.Control type="password" placeholder="Password" ref={this.password}/>
                </div>
              </Form.Group>
              <Form.Group controlId="formBasicUPLogin" as={Col}>
                <div className="formButton">
                  <Button variant="primary" type="button" onClick={this.UPLoginPressed.bind(this)}>
                    Submit
                  </Button>
                </div>
              </Form.Group>
            </Form>
          </Col>
          <Col>
            <VideoChat/>
          </Col>
          </Row>

          <div className={this.state.showError ? 'errorMessage' : 'hideMessage'}>{this.errorMessage}</div>
          <div className="makeAcct">
            <a href="\makeacct">Make Account</a>
          </div>

        </div>
      </div>
    )
  }
}

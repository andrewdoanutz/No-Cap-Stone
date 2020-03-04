import React, { Component } from 'react';
import {Form, Button, Col, Row, Card, Container} from 'react-bootstrap'
import Cookies from 'universal-cookie';

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
      cookies.set('login', this.username.current.value, { path: '/' });
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
      <div className = "large-vertical-space">
        <div className="homeBox">
          <h1 className="homeHead">Login</h1>
          <Container>
            <Row className="justify-content-center">
            <Col sm={6}>
              <Card className = "shadow">
                <Card.Body>
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
                        <Button size="lg" variant="flat" type="button" onClick={this.UPLoginPressed.bind(this)}>
                          Submit
                        </Button>
                      </div>
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>

            </Col>
            </Row>
          </Container>


          <div className={this.state.showError ? 'errorMessage' : 'hideMessage'}>{this.errorMessage}</div>
          <div className="makeAcct">
            <a href="\makeacct">Make Account</a>
          </div>

        </div>
      </div>
    )
  }
}

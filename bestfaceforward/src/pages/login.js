import React, { Component } from 'react';
import {Form, Button, Col} from 'react-bootstrap'

import '../css/login.css';

function UPLoginPressed(){

}

function KNLoginPressed(){

}

export default class Login extends Component {
    render() {
        return(
            <div>
                <div className="homeBox">
                    <div className="homeHead">Login</div>
                    <Form>
                        <Form.Row>
                            <Form.Group controlId="formBasicEmail" as={Col}>
                                <Form.Label className="formText">Username</Form.Label>
                                <div className="formField">
                                    <Form.Control type="email" placeholder="Enter email"/>
                                </div>
                            </Form.Group>
                            <Form.Group controlId="formBasicID" as={Col}>
                                <Form.Label className="formText">Meeting ID</Form.Label>
                                <div className="formField">
                                    <Form.Control type="mID" placeholder="Meeting ID"/>
                                </div>
                            </Form.Group>

                        </Form.Row>

                        <Form.Row>
                            <Form.Group controlId="formBasicPassword" as={Col}>
                                <Form.Label className="formText">Password</Form.Label>
                                <div className="formField">
                                    <Form.Control type="password" placeholder="Password"/>
                                </div>
                            </Form.Group>
                            <Form.Group controlId="formBasicName" as={Col}>
                                <Form.Label className="formText">Screen Name</Form.Label>
                                <div className="formField">
                                    <Form.Control type="name" placeholder="Screen Name"/>
                                </div>
                            </Form.Group>

                        </Form.Row>
                        <Form.Row>
                            <Form.Group controlId="formBasicUPLogin" as={Col}>
                                <div className="formButton">
                                    <Button variant="primary" type="button" onClick={UPLoginPressed.bind(this)} href="/dashboard">
                                    Submit
                                </Button>
                            </div>
                        </Form.Group>
                        <Form.Group controlId="formBasicKNLogin" as={Col}>
                            <div className="formButton">
                                <Button variant="primary" type="button" onClick={KNLoginPressed.bind(this)} href="/videocall">
                                Submit
                            </Button>
                        </div>
                    </Form.Group>
                </Form.Row>
            </Form>
            <a href="\makeacct" className="makeAcct">Make Account</a>
        </div>
    </div>
)
}
}

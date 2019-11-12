import React, { Component } from 'react'
import {Form, Button, Col} from 'react-bootstrap'


let Database = require('../components/Database')

export default class MakeAcct extends Component {
    
    constructor() {
        super()
        this.firstName = React.createRef();
        this.lastName = React.createRef();
        this.username = React.createRef();
        this.password = React.createRef();
        this.email = React.createRef();
        this.verifyPassword = React.createRef();
        this.errorMessage="dada"
        
    }
    state={
        showError:false
    }
    CreateAccount(){
        if(this.password.current.value !== this.verifyPassword.current.value){
            console.log(this.password.current.value);
            console.log(this.verifyPassword.current.value);
            this.errorMessage="Passwords do not match"
            this.setState({
                showError:true
            })
        } else {
            console.log(this.password.current.value);
            console.log(this.verifyPassword.current.value);
            Database.addUser(this.username.current.value,this.password.current.value,this.firstName.current.value,this.lastName.current.value,this.email.current.value);
            this.props.history.push('/login')
        }
       /* if(Database.addUser() !== 1){
            this.errorMessage="Unable to create account"
            this.setState({
                showError:true
            })
        } else {
            this.props.history.push('/dashboard')
        }*/
    }

    render() {
        return(
            <div>
                <div className="homeBox">
                    <div className="homeHead">Create Account</div>
                    <Form>
                         <Form.Row>
                            <Form.Group controlId="formBasicFirstName" as={Col}>
                                <Form.Label className="formText">FirstName</Form.Label>
                                <div className="formField">
                                    <Form.Control type="username" placeholder="Enter First Name" ref={this.firstName}/>
                                </div>
                            </Form.Group>
                        </Form.Row>

                         <Form.Row>
                            <Form.Group controlId="formBasicLastName" as={Col}>
                                <Form.Label className="formText">LastName</Form.Label>
                                <div className="formField">
                                    <Form.Control type="username" placeholder="Enter Last Name" ref={this.lastName}/>
                                </div>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group controlId="formBasicUsername" as={Col}>
                                <Form.Label className="formText">Username</Form.Label>
                                <div className="formField">
                                    <Form.Control type="username" placeholder="Enter username" ref={this.username}/>
                                </div>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group controlId="formBasicEmail" as={Col}>
                                <Form.Label className="formText">Email</Form.Label>
                                <div className="formField">
                                    <Form.Control type="Email" placeholder="Enter username" ref={this.email}/>
                                </div>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group controlId="formBasicPassword" as={Col}>
                                <Form.Label className="formText">Password</Form.Label>
                                <div className="formField">
                                    <Form.Control type="password" placeholder="Password" ref={this.password}/>
                                </div>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group controlId="formBasicVerifyPassword" as={Col}>
                                <Form.Label className="formText">Retype Password</Form.Label>
                                <div className="formField">
                                    <Form.Control type="password" placeholder="Password" ref={this.verifyPassword}/>
                                </div>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group controlId="formBasicCreateAccount" as={Col}>
                                <div className="formButton">
                                    <Button variant="primary" type="button" onClick={this.CreateAccount.bind(this)}>
                                    Submit
                                </Button>
                                </div>
                            </Form.Group>
                        </Form.Row>
            </Form>
            <div className={this.state.showError ? 'errorMessage' : 'hideMessage'}>{this.errorMessage}</div>
        </div>
    </div>
)
}
}

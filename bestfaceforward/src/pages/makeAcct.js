import React, { Component } from 'react'



let Database = require('../components/Database')

export default class MakeAcct extends Component {
    
    constructor() {
        super()
        this.username = React.createRef();
        this.password = React.createRef(); 
        this.errorMessage="dada"
        
    }
    state={
        showError:false
    }
    CreateAccount(){
        if(Database.addUser() !== 1){
            this.errorMessage="Unable to create account"
            this.setState({
                showError:true
            })
        } else {
            this.props.history.push('/dashboard')
        }
      }
    }

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
                                    <Form.Control type="username" placeholder="Enter username" ref={this.username}/>
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
                            <Form.Group controlId="formBasicUPLogin" as={Col}>
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

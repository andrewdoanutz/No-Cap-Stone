import React from "react";
import {Card,Col,Row} from 'react-bootstrap';


const Profile=(props)=>{
    if(props.right){
      return (
        <Card className = "w-50" style={{marginBottom: "10px"}}>
          <Card.Header>
            <h1 className="float-right">{props.name}</h1>
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <Row className="float-right">
                <Col>
                  <div>{props.yearMajor}</div>
                  <div>{props.linkedIn}</div>
                </Col>
                <Col>
                  <img style={{height: "200px"}} src={props.image}/>
                </Col>
                
              </Row>
            </Card.Text>
          </Card.Body>
        </Card>
      );
    } else {
      return (
        <Card className = "w-50" style={{marginBottom: "10px"}}>
          <Card.Header as="h1">{props.name}</Card.Header>
          <Card.Body>
            <Card.Text>
              <Row>
                <Col>
                  <img style={{height: "200px"}} src={props.image}/>
                </Col>
                <Col>
                  <div>{props.yearMajor}</div>
                  <div>{props.linkedIn}</div>
                </Col>
              </Row>
            </Card.Text>
          </Card.Body>
        </Card>
      );
    }
}

export default Profile;

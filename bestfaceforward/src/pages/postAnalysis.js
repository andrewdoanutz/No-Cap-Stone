import React, { Component } from 'react';
import axios from 'axios'
import {Accordion, Card, Row, Col, Button} from 'react-bootstrap';
import {RadarChart, Radar, PolarGrid, PolarRadiusAxis, PolarAngleAxis, Sector, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import Report from './../components/Report'

class postAnalysis extends Component{

  constructor(props){
    super(props);
    this.state={
      transcript:[
        "first text, something about being upset often and nonconfident in team performance",

          "second text, Happy when things work out and I hope for the best for our team",

          "in most situations our team worked well under pressure. When ever we didn't communicate we roked for solutions"
      ],
      candidateName:"John Doe",
      txt: "When Working on my group project, a team member was not carrying their own weight. They weren't completing assingments or showing up to meetings. To solve the problem we were direct with them in a positive wayy and tried to work with them in person",
    }
  }

render(){
  return(
    <div className="homeBox">
      <div className="homeHead">Post Analysis Report for {this.state.candidateName}</div>
      <Row>
        <Col>
          <Accordion defaultActiveKey="0">
          {this.state.transcript.map(function(text, index){
            return (
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey={index}>
                    <h2> Question {index+1} </h2>
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={index}>
                  <Card.Body>
                    <Report questions={text}/>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            )
            })
          }
          </Accordion>
        </Col>
      </Row>

</div>
)
}


}
export default postAnalysis;

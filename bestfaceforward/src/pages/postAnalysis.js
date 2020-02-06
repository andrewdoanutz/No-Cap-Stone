import React, { Component } from 'react';
import axios from 'axios'
import {Button, Card, Row, Col} from 'react-bootstrap';
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
      txt: "When Working on my group project, a team member was not carrying their own weight. They weren't completing assingments or showing up to meetings. To solve the problem we were direct with them in a positive wayy and tried to work with them in person",
    }
  }

render(){
  return(
    <div>
    {this.state.transcript.map(function(text){
      return <Row><Card>
        <Card.Body>
          <Report questions={text}/>
        </Card.Body>
      </Card></Row>;
    })
  }
</div>
)
}


}
export default postAnalysis;

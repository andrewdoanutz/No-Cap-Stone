import React, { Component } from 'react';
import axios from 'axios'
import {Button, Card, Row, Col} from 'react-bootstrap';
import {RadarChart, Radar, PolarGrid, PolarRadiusAxis, PolarAngleAxis, Sector, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,} from 'recharts';


class Report extends Component {
  constructor(props){
    super(props);

    this.state = {
      txt: "Hello I hate my life but I also love going on walks. I wonder what is for lunch today? Um I don't know really. Um yea that works. Yes um yea. I LOVE YOU. Haha.",
      analysis: [
                  {
                    tone_name: 'Anger', score: 0
                  },
                  {
                    tone_name: 'Fear', score: 0
                  },
                  {
                    tone_name: 'Joy', score: 0
                  },
                  {
                    tone_name: 'Sadness', score: 0
                  },
                  {
                    tone_name: 'Analytical', score: 0
                  },
                  {
                    tone_name: 'Confident', score: 0
                  },
                  {
                    tone_name: 'Tentative', score: 0
                  }
                ]
    }
  }

  analyzeText = (ev) => {
    ev.preventDefault()
    //this.setState ({isClicked:true})

    //Post call to backend
    axios.post('http://localhost:3001/api/transcript', {transcript: this.state.txt})
   .then(res => {

     //Gets analysis from backend
     // var tones = res.data.toneAnalysis.result.document_tone.tones
     // for (var tone in analysis){
     //   if (tone.hasOwnProperty(tone)){
     //     tone.score
     //   }
     // }
     this.setState({
       analysis: res.data.toneAnalysis.result.document_tone.tones
     })
     console.log(res.data.toneAnalysis.result);
     console.log(this.state.analysis)
   })
  }




  render(){
    return(
      <div>
        <Button onClick={this.analyzeText}>Analyze</Button>
        <Row>
          <Col sm={6}>
            <Card bg="dark" text="white" >
              <Card.Header as="h5">Tone Analysis</Card.Header>
              <Card.Body>
                <Card.Text>
                  <RadarChart cx={300} cy={250} outerRadius={150} width={500} height={500} data={this.state.analysis}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="tone_name"/>
                    <PolarRadiusAxis />
                    <Radar name="score" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  </RadarChart>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

      </div>
    );
  }

}

export default Report;

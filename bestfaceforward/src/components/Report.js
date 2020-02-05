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
                ],
      filler: 0
    }
  }

  //get number of occurances in an array of a specific value
  getOccurrence = (array, value) => {
    var count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
  }

  analyzeText = (ev) => {
    ev.preventDefault()

    var txt = this.state.txt.toLowerCase()
    var words = txt.split(" ")
    var wordArray = Object.values(words)

    this.setState({filler: this.getOccurrence(wordArray, 'um')})



    //Post call to backend for analysis of transcript
    axios.post('http://localhost:3001/api/transcript', {transcript: this.state.txt})
   .then(res => {

     //Gets analysis from backend
     // var tones = res.data.toneAnalysis.result.document_tone.tones
     // for (var tone in analysis){
     //   if (tone.hasOwnProperty(tone)){
     //     tone.score
     //   }
     // }
     console.log(res.data.toneAnalysis.result.document_tone.tones)
     var tones = res.data.toneAnalysis.result.document_tone.tones
     var finalTone = [ {tone_name: 'Anger', score: 0.1},
                 {
                   tone_name: 'Fear', score: 0.1
                 },
                 {
                   tone_name: 'Joy', score: 0.1
                 },
                 {
                   tone_name: 'Sadness', score: 0.1
                 },
                 {
                   tone_name: 'Analytical', score: 0.1
                 },
                 {
                   tone_name: 'Confident', score: 0.1
                 },
                 {
                   tone_name: 'Tentative', score: 0.1
                 }
               ]
     for (var i of tones){
       for (var a of finalTone){
         if (a.tone_name == i.tone_name){
           a.score = i.score
         }
       }
     }
     console.log(finalTone)
     this.setState({
       analysis: finalTone
     })
     //console.log(res.data.toneAnalysis.result);
     //console.log(this.state.analysis)
   })
  }




  render(){
    return(
      <div>
        <Button onClick={this.analyzeText}>Analyze</Button>
        <Row>
          <Col sm={6}>
            <Card>
              <Card.Header as="h3">Tone Analysis</Card.Header>
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
          <Col sm={2}>
            <Card>
              <Card.Header as="h3">Filler Count</Card.Header>
              <Card.Body>
                <Card.Text as="h4">
                  <div>Numer of Filler Words: {this.state.filler}</div>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div>{this.state.txt}</div>

      </div>
    );
  }

}

export default Report;

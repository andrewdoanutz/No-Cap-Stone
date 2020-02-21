// TODO: Analyze audio for speed/clarity/pacing on recrded mp4 file and display here

//TODO: analyze transcript in "txt" variable for filler words/ no-no words/ ramblng

//index.js


import React, { Component } from 'react';
import axios from 'axios'
import {Button, Card, Row, Col} from 'react-bootstrap';
import {RadarChart, Radar, PolarGrid, PolarRadiusAxis, PolarAngleAxis, Sector, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';


class Report extends Component {
  constructor(props){
    super(props);
    this.state = {
      txtJson:[

      "first text, something about being upset often and nonconfident in team performance. team sucks and I really hate them and wish they were better",

        "second text, Happy when things work out and I hope for the best for our team. They are so awesome and I love them and we are the best team ever.",

        "in most situations our team worked well under pressure. When ever we didn't communicate we roked for solutions. Very well under pressure."
      ],
      txt: this.props.questions,
      index: this.props.index,
      username: this.props.username,
      index: this.props.index,
      speed:"average",
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
      filler: 0,
      keywords: [{keyword: '1', score: 0.1},
                  {keyword: '2', score: 0.1},
                  {keyword: '3', score: 0.1}],
      concepts: [{concepts: '1', score: 1},
                  {concepts: '2', score: 1},
                  {concepts: '3', score: 1}],
    }
    this.readTranscript()
    this.analyzeText()
    this.getSubjects()
    this.getSpeed()
  }

getSpeed = () => {
  var speed =this.state.speed
  axios.post('http://localhost:3001/db/readAudioAnalysis', {username: this.state.username, index:this.state.index})
  .then(res=> {
    console.log("SPEED:", res)
    this.setState({
      speed: res.data
    })
  })
}

  //get number of occurances in an array of a specific value
  getOccurrence = (array, value) => {
    var count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
  }
  
  readTranscript = () => {
    console.log("WTF")
    axios.post('http://localhost:3001/db/readTranscript' , {username:this.state.username}).then(res=>{
      this.setState({
        txt: res.data[this.state.index]
      })})
    console.log("stopped") 
    console.log(this.state.txt)
  }

  getSubjects = () => {
    var txt = this.state.txt.toLowerCase()
    axios.post('http://localhost:3001/api/subjects', {transcript: this.state.txt})
   .then(res => {
     console.log("Response: ",res)
     var keywords = res.data.analysisResults.result.keywords
     var finalKeywords = [ {keyword: '1', score: 0.1},
                 {keyword: '2', score: 0.1},
                 {keyword: '3', score: 0.1}
               ]
     var concepts = res.data.analysisResults.result.concepts
     var finalConcepts = [ {concept: '1', score: 1},
                 {concept: '2', score: 1},
                 {concept: '3', score: 1}
               ]
    var current = 0
     for (var i of keywords){
       finalKeywords[current].keyword = i.text
       finalKeywords[current].score = i.relevance
       current+=1
     }
     current = 0
     for (var i of concepts){
       finalConcepts[current].concept = i.text
       finalConcepts[current].score = i.relevance * 10
       current+=1
     }
     console.log(finalKeywords)
     console.log(finalConcepts)
     this.setState({
       concepts: finalConcepts,
       keywords: finalKeywords
     })
   })
  }

  analyzeText = () => {

    var txt = this.state.txt.toLowerCase()
    var words = txt.split(" ")
    var wordArray = Object.values(words)

    this.setState({filler: this.getOccurrence(wordArray, 'um')})
  //Post call to backend for analysis of transcript
    axios.post('http://localhost:3001/db/readToneAnalysis', {username: this.state.username})
   .then(res => {

     //Gets analysis from backend
     // var tones = res.data.toneAnalysis.result.document_tone.tones
     // for (var tone in analysis){
     //   if (tone.hasOwnProperty(tone)){
     //     tone.score
     //   }
     // }
     // console.log(res.data.toneAnalysis.result.document_tone.tones)
     // var tones = res.data.toneAnalysis.result.document_tone.tones
     console.log("RES.DATA:", res.data)
     var tones = res.data
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
     console.log("FINALTONE:" ,finalTone)
     this.setState({
       analysis: finalTone
     })
     //console.log(res.data.toneAnalysis.result);
     //console.log(this.state.analysis)
   })
  }


  getFeedback(){
    var res=""
    for (var a of this.state.analysis){
      if (a.tone_name === 'Fear'){
        if(a.score>=.8){
          res+="Try to be more confident in what you are saying. Don't be scared of the interviewer. "
        } else if(a.score>=.4){
          res+="A little more confidence in what you are saying will help get your point across better. "
        }
      } else if (a.tone_name === 'Joy'){
        if(a.score>=.8){
          res+="You are coming across very happy. Keep it up! "
        } else if(a.score>=.4){
          res+="Try to speak a little joyfully when you are responding. "
        } else {
          res+="You should use more joyful vocabulary when responding. "
        }
      } else if (a.tone_name === 'Sadness'){
        if(a.score>=.8){
          res+="You should speak with happier words. "
        } else if(a.score>=.4){
          res+="Some of your words are coming across kind of sad. Use more happy vocabulary. "
        }
      } else if (a.tone_name === 'Analysis'){
        if(a.score>=.8){
          res+="Your response is very analytical. Try to speak more naturally. "
        } else if(a.score>=.4){
          res+="Your response is analytical and logical. Good job! "
        } else {
          res+="Try to be more analytical and logical in your response. "
        }
      } else if (a.tone_name === 'Confident'){
        if(a.score>=.8){
          res+="You are very confident in what you are saying. Good job! "
        } else if(a.score>=.4){
          res+="A little more confidence in what you are saying will help get your point across better. "
        } else {
          res+="Try being more confident in your response. "
        }
      } else if (a.tone_name === 'Tentative'){
        if(a.score>=.8){
          res+="You are very hesitant in what your are saying. Don't be scared of the interviewer. "
        } else if(a.score>=.4){
          res+="You are a little hesitant in what you are saying. "
        }
      }
    }
    if(this.state.filler>6){
      res+= "You are using a lot of filler words when you respond. Try cutting back on the ums and uhs. "
    } else if(this.state.filler>3) {
      res+="You are using some filler words in your response. Try pausing between sentences instead of using ums and uhs. "
    } else {
      res+="You are barely using any filler words. Good job!. "
    }
    return res;
  }



  render(){
    var analysisList = (this.state.txtJson).map(function(text){
       return <Row><Card style={{ width: '18rem' }}>
         <Card.Body>
            <Card.Title>{text}</Card.Title>
            <Card.Text>

            </Card.Text>
          </Card.Body>
        </Card></Row>;
     })
     /* <Col>
     {analysisList}
   </Col> */
    return(
      <div>
        <Row>
          {/* Left Column */}
            <Col sm={6}>
              <Card style={{marginBottom: "10px"}}>
                <Card.Header as="h3">Question Response</Card.Header>
                <Card.Body>
                  <Card.Text>
                    {this.state.txt}
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card style={{marginBottom: "10px"}}>
                <Card.Header as="h3">Feedback for Candidate</Card.Header>
                <Card.Body>
                  <Card.Text>
                    {this.getFeedback()}
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card style={{marginBottom: "10px"}}>
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
            {/* Right Column */}
            <Col sm = {5}>
              <Card style={{marginBottom: "10px"}}>
                  <Card.Header as="h3">Keywords</Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <BarChart
                      width={500}
                      height={300}
                      data={this.state.keywords}
                      margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                      }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="keyword" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="score" fill="#8884d8" />
                      </BarChart>
                    </Card.Text>
                  </Card.Body>
                </Card>
                <Card style={{marginBottom: "10px"}}>
                  <Card.Header as="h3">Concepts</Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <ResponsiveContainer height={3 * 50 + 10} width="50%">
                      <BarChart
                          data={this.state.concepts}
                          margin={{top: 0, right: 40, left: 40, bottom: 20}}
                          layout="vertical"
                          barCategoryGap="20%"
                          barGap={2}
                          maxBarSize={10}
                      >
                          <CartesianGrid
                              horizontal={false}
                              stroke='#a0a0a0'
                              strokeWidth={0.5}
                          />
                          <XAxis
                              type="number"
                              axisLine={false}
                              stroke='#a0a0a0'
                              //domain={[5, 10]}
                              //ticks={[ 7.5, 10]}
                              strokeWidth={0.5}
                          />
                          <YAxis
                              type="category"
                              dataKey={this.state.concepts.concept}
                              width={40}
                          />
                          <Bar
                              dataKey="score"
                              animationDuration={1000}
                              label={{position: 'right', backgroundColor: '#fff'}}
                              // shape={<Rectangle
                              //     className={classes.rectangle}
                              //     radius={[0, 10, 10, 0]}
                              // />}
                          >
                          </Bar>
                      </BarChart>
                      </ResponsiveContainer>
                    </Card.Text>
                  </Card.Body>
                </Card>
                <Card style={{marginBottom: "10px"}}>
                    <Card.Header as="h3">Filler Count</Card.Header>
                    <Card.Body>
                      <Card.Text as="h4">
                        <div>Number of Filler Words: {this.state.filler}</div>
                      </Card.Text>
                    </Card.Body>
                </Card>
                <Card style={{marginBottom: "10px"}}>
                    <Card.Header as="h3">Talking Speed</Card.Header>
                    <Card.Body>
                      <Card.Text as="h4">
                        <div>During this question your speed was: {this.state.speed}</div>
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

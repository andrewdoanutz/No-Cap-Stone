import React, { Component } from 'react';
import axios from 'axios'
import {Card, Row, Col} from 'react-bootstrap';
import {RadarChart, Radar, PolarGrid, PolarRadiusAxis, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Area,AreaChart} from 'recharts';
import StarRatingComponent from 'react-star-rating-component';


class Report extends Component {
  constructor(props){
    super(props);
    this.state = {
      txt: this.props.responses,
      videoURL:this.props.videoURL,
      videoScore:this.props.videoScore,
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
    this.analyzeText()
  }
  
  

  //get number of occurances in an array of a specific value
  getOccurrence = (array, value) => {
    var count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
  }

  getSubjects(){
    axios.post('http://localhost:3001/api/subjects', {transcript: this.state.txt})
   .then(res => {
     var keywords = res.data.analysisResults.result.keywords
     var concepts = res.data.analysisResults.result.concepts
    if(keywords.length>0){
      var keyWordFeedback="Keywords you used are: "
      for (var i of keywords){
          if(i.relevance>.5){
            keyWordFeedback+=i.text
            if(i.text!=keywords[keywords.length-1].text){
              keyWordFeedback+=", "
            }
          }
      }
      keyWordFeedback+="."
    } else {
     var keyWordFeedback=""
    }
    if(concepts.length>0){
    var conceptFeedback="Concepts you emphasized are: "
    for (var i of concepts){
       if(i.relevance>.5){
         conceptFeedback+=i.text
         if(i.text!=concepts[concepts.length-1].text){
           conceptFeedback+=", "
         }
       }
    }
   conceptFeedback+=". "
  } else {
    var conceptFeedback=""
  }

    return conceptFeedback+keyWordFeedback
   })
  }

  analyzeText = () => {

    // var txt = this.state.txt.toLowerCase()
    // var words = txt.split(" ")
    // var wordArray = Object.values(words)

    // this.setState({filler: this.getOccurrence(wordArray, 'um')})



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
          res+="Try to speak a little more joyfully when you are responding. "
        } else {
          res+="You should use more joyful vocabulary when responding. "
        }
      } else if (a.tone_name === 'Anger'){
        if(a.score>=.8){
          res+="You are coming across very angery. Be less aggressive in your response. "
        } else if(a.score>=.4){
          res+="Try to speak a little less aggresively when you are responding. "
        } 
      } else if (a.tone_name === 'Sadness'){
        if(a.score>=.8){
          res+="You should speak with happier words. "
        } else if(a.score>=.4){
          res+="Some of your words are coming across kind of sad. Use more happy vocabulary. "
        }
      } else if (a.tone_name === 'Analytical'){
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
      res+="You are barely using any filler words. Good job! "
    }
    return res;
  }
  formatVideoScores(){
    let res=[]
    let current=0
    this.state.videoScore.forEach(i =>{
      if(i>0){
        res.push({ind:current, score: i, nscore:0})
      } else{
        res.push({ind:current, score: 0,nscore:i})
      }
      
      current++;
    })
    
    return res
  }
  maxScore(scores){
    let maxScore=0
    let secondMaxInd=0
    let maxInd=0
    scores.map((value,index)=>{
      if(Math.abs(value)>maxScore){
        maxScore=value
        secondMaxInd=maxInd
        maxInd=index
      }
    })
    let maxAttribute=""
    let second=""
    if(maxInd===0){
      maxAttribute= "Joy"
    } else if (maxInd===1){
      maxAttribute= "Sorrow"
    } else if (maxInd===2){
      maxAttribute= "Anger"
    } else {
      maxAttribute= "Surprise"
    }
    if(secondMaxInd===0){
      second= "Joy"
    } else if (secondMaxInd===1){
      second= "Sorrow"
    } else if (secondMaxInd===2){
      second= "Anger"
    } else {
      second= "Surprise"
    }
    return maxAttribute,second
  }
  videoFeedback(){
    let joy=0
    let sorrow=0
    let anger=0
    let surprise=0
    for (var a of this.state.videoScore){
      if (a[0] === 'Joy'){
        joy+=a[1]
      } else if (a.tone_name === 'Sorrow'){
        sorrow+=a[1]
      } else if (a.tone_name === 'Anger'){
        anger+=a[1]
      } else if (a.tone_name === 'Surprise'){
        surprise+=a[1]
      } 
    }
    let maxAttribute,secondMaxAttribute=this.maxScore([joy,sorrow,anger,surprise])
    let res=""
    res+="The strongest emotion you showed was "+maxAttribute+". The second strongest was "+secondMaxAttribute+". "
    if(this.state.filler>6){
      res+= "You are using a lot of filler words when you respond. Try cutting back on the ums and uhs. "
    } else if(this.state.filler>3) {
      res+="You are using some filler words in your response. Try pausing between sentences instead of using ums and uhs. "
    } else {
      res+="You are barely using any filler words. Good job! "
    }
    return res;
  }
  timestampAnalysis(){
    let wpm=0
    this.props.timestamps.forEach(pair=>{
      wpm+=pair[1]-pair[0]
    })
    wpm=wpm*60/this.props.timestamps.length
    let feedback="Your average words per minute was "+Math.round(wpm)+". "
    if(wpm<130){
      feedback+="Try speaking a little faster."
    }if(wpm>170){
      feedback+="Try speaking a little slower."
    }
    return feedback
  }
  getStarRating(){
    let analysisScore=0.0
    for (var a of this.state.analysis){
      if (a.tone_name === 'Fear'){
        if(a.score>=.8){
          analysisScore-=1
        } else if(a.score>=.4){
          analysisScore-=.5
        } else {
          analysisScore+=.2
        }
      } else if (a.tone_name === 'Joy'){
        if(a.score>=.8){
          analysisScore+=1
        } else if(a.score>=.4){
          analysisScore+=.5
        } else {
          analysisScore-=.5
        }
      } else if (a.tone_name === 'Anger'){
        if(a.score>=.8){
          analysisScore-=1
        } else if(a.score>=.4){
          analysisScore-=.5
        } else {
          analysisScore+=.5
        }
      } else if (a.tone_name === 'Sadness'){
        if(a.score>=.8){
          analysisScore-=1
        } else if(a.score>=.4){
          analysisScore-=.5
        } else {
          analysisScore+=.5
        }
      } else if (a.tone_name === 'Analytical'){
        if(a.score>=.8){
          analysisScore+=1
        } else if(a.score>=.4){
          analysisScore+=.5
        } else {
          analysisScore-=.5
        }
      } else if (a.tone_name === 'Confident'){
        if(a.score>=.8){
          analysisScore+=1
        } else if(a.score>=.4){
          analysisScore+=.5
        } else {
          analysisScore-=.5
        }
      } else if (a.tone_name === 'Tentative'){
        if(a.score>=.8){
          analysisScore-=1
        } else if(a.score>=.4){
          analysisScore-=.5
        } else {
          analysisScore+=.5
        }
      } 
    }
    let vidSum=0
    for (var a of this.state.videoScore){
      if (a[0] === 'Joy'){
        if(Math.abs(a[1])>=3){
          vidSum+=1
        } else if(Math.abs(a[1])==2){
          vidSum+=.5
        } else {
          vidSum-=.5
        }
      } else if (a[0] === 'Sorrow'){
        if(Math.abs(a[1])>=3){
          vidSum-=1
        } else if(Math.abs(a[1])==2){
          vidSum-=.5
        } else {
          vidSum+=.5
        }
      } else if (a[0] === 'Anger'){
        if(Math.abs(a[1])>=3){
          vidSum-=1
        } else if(Math.abs(a[1])==2){
          vidSum-=.5
        } else {
          vidSum+=.5
        }
      } else if (a[0] === 'Surprise'){
        if(Math.abs(a[1])>=3){
          vidSum-=1
        } else if(Math.abs(a[1])==2){
          vidSum-=.5
        } else {
          vidSum+=.5
        }
      } 
    }
    vidSum=vidSum/this.state.videoScore.length
    let totalScore=analysisScore+vidSum
    if(this.props.overall){
      let wpm=0
      this.props.timestamps.forEach(pair=>{
      wpm+=pair[1]-pair[0]
      })
      wpm=wpm*60/this.props.timestamps.length
      wpm=Math.round(wpm)
      let wpmScore=0.0
      if(wpm<130){
        wpmScore-=1
      }if(wpm>170){
        wpmScore+=1
      }
      totalScore+=wpmScore
    }
    
    console.log("Star Score:", totalScore)
    if(totalScore>5){
      return 5
    } else if(totalScore<0){
      return 0
    } else {
      return Math.round(totalScore)
    }
  }


  render(){
    if(this.props.overall){
      return(
        <div>
          <Row>
            {/* Left Column */}
              <Col sm={6}>
                <Card className = "shadow" style={{marginBottom: "10px"}}>
                  <Card.Header as="h3">
                    Question Response
                    <StarRatingComponent 
                      name="overall" 
                      starCount={5}
                      value={this.getStarRating()}
                      editing={false}
                    />
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <h4>{this.state.txt}</h4>
                    </Card.Text>
                  </Card.Body>
                </Card>
                <Card className = "shadow" style={{marginBottom: "10px"}}>
                  <Card.Header as="h3">Speech Analysis</Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <Row>
                        <RadarChart cx={300} cy={250} outerRadius={150} width={500} height={500} data={this.state.analysis}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="tone_name"/>
                          <PolarRadiusAxis />
                          <Radar name="score" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                        </RadarChart>
                      </Row>
                      <Row>
                        <h4>{this.getFeedback()}{this.getSubjects()}{this.timestampAnalysis()}</h4>
                      </Row>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              {/* Right Column */}
              <Col sm={6}>
                <Row>
                  <Card className = "shadow" style={{marginBottom: "10px"}}>
                      <Card.Header as="h3">Video Analysis</Card.Header>
                      <Card.Body>
                        <Card.Text>
                          <Row>
                            <AreaChart
                              width={600}
                              height={500}
                              data={this.formatVideoScores()}
                              margin={{
                                top: 10, right: 30, left: 0, bottom: 0,
                              }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="ind"/>
                              <YAxis />
                              <Area type="monotone" dataKey="score" stroke="#000" fill="green" />
                              <Area type="monotone" dataKey="nscore" stroke="#000" fill="red" />
                            </AreaChart>
                          </Row>
                          <Row>
                            <h3>{this.videoFeedback()}</h3>
                          </Row>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Row>
                </Col>
              </Row>
          </div>
        );
    } else {
    return(
      <div>
        <Row>
          {/* Left Column */}
            <Col sm={6}>
              <Card className = "shadow" style={{marginBottom: "10px"}}>
                <Card.Header as="h3">
                  Question Response
                  <StarRatingComponent 
                      name={this.props.index}
                      starCount={5}
                      value={this.getStarRating()}
                      editing={false}
                    />
                  </Card.Header>
                <Card.Body>
                  <Card.Text>
                    <h4>{this.state.txt}</h4>
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className = "shadow" style={{marginBottom: "10px"}}>
                <Card.Header as="h3">Speech Analysis</Card.Header>
                <Card.Body>
                  <Card.Text>
                    <Row>
                      <RadarChart cx={300} cy={250} outerRadius={150} width={500} height={500} data={this.state.analysis}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="tone_name"/>
                        <PolarRadiusAxis />
                        <Radar name="score" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                      </RadarChart>
                    </Row>
                    <Row>
                      <h4>{this.getFeedback()}{this.getSubjects()}</h4>
                    </Row>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            {/* Right Column */}
            <Col sm={6}>
              <Row>
                <Card className = "shadow" style={{marginBottom: "10px"}}>
                  <Card.Header as="h3">Video Response</Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <iframe width="600px" height="300px" src={this.state.videoURL}/>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Row>
              <Row>
                <Card className = "shadow" style={{marginBottom: "10px"}}>
                    <Card.Header as="h3">Video Analysis</Card.Header>
                    <Card.Body>
                      <Card.Text>
                        <Row>
                          <AreaChart
                            width={600}
                            height={500}
                            data={this.formatVideoScores()}
                            margin={{
                              top: 10, right: 30, left: 0, bottom: 0,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="ind"/>
                            <YAxis />
                            <Area type="monotone" dataKey="score" stroke="#000" fill="green" />
                            <Area type="monotone" dataKey="nscore" stroke="#000" fill="red" />
                          </AreaChart>
                        </Row>
                        <Row>
                          <h3>{this.videoFeedback()}</h3>
                        </Row>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Row>
              </Col>
            </Row>
        </div>
      );
    }
  }

}

export default Report;
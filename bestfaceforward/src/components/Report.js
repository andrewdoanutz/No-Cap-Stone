import React, { Component } from 'react';
import axios from 'axios'
import {Card, Row, Col, Button,Accordion} from 'react-bootstrap';
import {RadarChart, AreaChart, Area, Bar, BarChart, Radar, Line, Label, LineChart, PolarGrid, PolarRadiusAxis, PolarAngleAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import StarRatingComponent from 'react-star-rating-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'

class Report extends Component {
  constructor(props){
    super(props);
    this.state = {
      txt: this.props.responses,
      videoURL:this.props.videoURL,
      videoScore:this.props.videoScore,
      img: this.props.img,
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

    return [conceptFeedback,keyWordFeedback]
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
  getNegFeedback(){
    let negFeedback=[]

    for (var a of this.state.analysis){
      if (a.tone_name === 'Fear'){
        if(a.score>=.8){

            negFeedback.push("Try to be more confident in what you are saying.")

        } else if(a.score>=.4){

            negFeedback.push("A little more confidence in what you are saying will help get your point across better. ")


        }
      } else if (a.tone_name === 'Joy'){
        if(a.score>=.8){

          continue
        } else if(a.score>=.4){

            negFeedback.push("Try to speak with a more positive attitude when you are responding.")


        } else {

            negFeedback.push("You should be more positive in your wording when responding. ")


        }
      } else if (a.tone_name === 'Anger'){
        if(a.score>=.8){

            negFeedback.push("You are coming across very angery. Be less aggressive in your response. ")


        } else if(a.score>=.4){

            negFeedback.push("Try to speak a little less aggresively when you are responding.")


        }
      } else if (a.tone_name === 'Sadness'){
        if(a.score>=.8){

            negFeedback.push("You should speak with happier words. ")


        } else if(a.score>=.4){

            negFeedback.push("Some of your words are coming across kind of sad. Use more happy vocabulary. ")



        }
      } else if (a.tone_name === 'Analytical'){
        if(a.score>=.8){

            negFeedback.push("Your response is very analytical. Try to speak more naturally. ")


        } else if(a.score>=.4){

          continue
        } else {

            negFeedback.push("Try to be more analytical and logical in your response. ")


        }
      } else if (a.tone_name === 'Confident'){
        if(a.score>=.8){

          continue
        } else if(a.score>=.4){

            negFeedback.push("A little more confidence in what you are saying will help get your point across better. ")


        } else {

            negFeedback.push("Try being more confident in your response. ")


        }
      } else if (a.tone_name === 'Tentative'){
        if(a.score>=.8){

            negFeedback.push("You are very hesitant in what your are saying. Don't be scared of the interviewer. ")


        } else if(a.score>=.4){

            negFeedback.push("You are a little hesitant in what you are saying. ")


        }

        return negFeedback
      }
    }
    // if(this.state.filler>6){
    //   res+= "You are using a lot of filler words when you respond. Try cutting back on the ums and uhs. "
    // } else if(this.state.filler>3) {
    //   res+="You are using some filler words in your response. Try pausing between sentences instead of using ums and uhs. "
    // } else {
    //   res+="You are barely using any filler words. Good job! "
    // }

  }

  sortData(){
    var times = this.props.timestamps
    times.sort((a, b) => (a.speed < b.speed) ? 1 : -1)
    return times
  }

  getPosFeedback(){
    let posFeedback=[]

    for (var a of this.state.analysis){
      if (a.tone_name === 'Fear'){
        if(a.score<.4){
            posFeedback.push("You do not seem nervous in your tone.")
        }
      } else if (a.tone_name === 'Joy'){
        if(a.score>=.8){

            posFeedback.push("You are coming across very happy. Keep it up! ")


        }
      } else if (a.tone_name === 'Anger'){
        if(a.score<.4){

            posFeedback.push("Your tone is not angry in nature. That's a great sign! ")


        }
      } else if (a.tone_name === 'Sadness'){
        if(a.score<.4){

            posFeedback.push("You are not speaking very sadly. Good job!")


        }
      } else if (a.tone_name === 'Analytical'){
        if(a.score>=.4){

            posFeedback.push("Your response is analytical and logical.")


        }
      } else if (a.tone_name === 'Confident'){
        if(a.score>=.8){

            posFeedback.push("You are very confident in what you are saying. Good job! ")


        }
      } else if (a.tone_name === 'Tentative'){
        if(a.score<.4){

            posFeedback.push("You are not speaking tentatively. Keep it up! ")


        }
        let subjects=this.getSubjects()
        if(subjects){
          posFeedback=posFeedback.concat(subjects)
        }

        return posFeedback
      }
    }
    // if(this.state.filler>6){
    //   res+= "You are using a lot of filler words when you respond. Try cutting back on the ums and uhs. "
    // } else if(this.state.filler>3) {
    //   res+="You are using some filler words in your response. Try pausing between sentences instead of using ums and uhs. "
    // } else {
    //   res+="You are barely using any filler words. Good job! "
    // }

  }
  toPercent(decimal, fixed = 0){
    return `${(decimal * 100).toFixed(fixed)}%`;
  }
  getPercent(value, total){
    const ratio = total > 0 ? value / total : 0;

    return this.toPercent(ratio, 2);
  }


  renderTooltipContent(o){
    const { payload, label } = o;
    const total = payload.reduce((result, entry) => (result + entry.value), 0);

    return (
      <div className="customized-tooltip-content">
         <Card>
            <Card.Body>
            <p className="total">{`${label} (Total: ${total})`}</p>
            <ul className="list">
              {
                payload.map((entry, index) => (
                  <div key={`item-${index}`} style={{color: entry.color}}>
                    {entry.name+`: `+entry.value}
                    {/* {entry.name}+{`: `}+{entry.value}+{this.getPercent(entry.value, total).bind(this)} percent not working for some reason*/}
                  </div>
                ))
              }
            </ul>
            </Card.Body>
        </Card>

      </div>
    );
  };
  formatVideoScores(){
    let res=[]
    this.state.videoScore[0].map((value,index) =>{
      res.push({ind:index, joy: value, sorrow:this.state.videoScore[1][index], anger:this.state.videoScore[2][index],surprise:this.state.videoScore[3][index]})
    })

    return res
  }
  maxScore(scores){
    let maxScore=0
    let maxInd=0
    scores.map((value,index)=>{
      if(Math.abs(value)>maxScore){
        maxScore=Math.abs(value)
        maxInd=index
      }
    })
    let maxAttribute="Unknown"
    if(maxInd===0){
      maxAttribute= "Joy"
    } else if (maxInd===1){
      maxAttribute= "Sorrow"
    } else if (maxInd===2){
      maxAttribute= "Anger"
    } else {
      maxAttribute= "Surprise"
    }

    return maxAttribute
  }
  videoFeedback(){
    let joy=0
    let sorrow=0
    let anger=0
    let surprise=0
    this.state.videoScore.map((value,index) =>{
      value.forEach((a)=>{
        if (index===0){
          joy+=a
        } else if (index===1){
          sorrow+=a
        } else if (index===2){
          anger+=a
        } else if (index===3){
          surprise+=a
        }
      })
    })

    let maxAttribute=this.maxScore([joy,sorrow,anger,surprise])
    let res=""
    res+="The strongest emotion you showed was "+maxAttribute+". "
    if(maxAttribute==="Joy"){
      res+="Good job! Keep it up."
    } else {
      res+="Try smiling a little more."
    }
    return res;
  }

  getStarRating(){
    let analysisScore=0.0
    for (var a of this.state.analysis){
      if (a.tone_name === 'Fear'){
        if(a.score>=.8){
          analysisScore-=.5
        } else if(a.score>=.4){
          analysisScore-=.3
        } else {
          analysisScore+=.5
        }
      } else if (a.tone_name === 'Joy'){
        if(a.score>=.8){
          analysisScore+=.5
        } else if(a.score>=.4){
          analysisScore+=.3
        } else {
          analysisScore-=.5
        }
      } else if (a.tone_name === 'Anger'){
        if(a.score>=.8){
          analysisScore-=.5
        } else if(a.score>=.4){
          analysisScore-=.3
        } else {
          analysisScore+=.5
        }
      } else if (a.tone_name === 'Sadness'){
        if(a.score>=.8){
          analysisScore-=.5
        } else if(a.score>=.4){
          analysisScore-=.3
        } else {
          analysisScore+=.5
        }
      } else if (a.tone_name === 'Analytical'){
        if(a.score>=.8){
          analysisScore+=.5
        } else if(a.score>=.4){
          analysisScore+=.3
        } else {
          analysisScore-=.5
        }
      } else if (a.tone_name === 'Confident'){
        if(a.score>=.8){
          analysisScore+=.5
        } else if(a.score>=.4){
          analysisScore+=.3
        } else {
          analysisScore-=.5
        }
      } else if (a.tone_name === 'Tentative'){
        if(a.score>=.8){
          analysisScore-=.5
        } else if(a.score>=.4){
          analysisScore-=.3
        } else {
          analysisScore+=.5
        }
      }
    }
    let vidSum=0
    this.state.videoScore.map((value,index)=>{
      if (index===0){
        if(Math.abs(value)>=3){
          vidSum+=.5
        } else if(Math.abs(value)==2){
          vidSum+=.3
        } else {
          vidSum-=.5
        }
      } else if (index===1){
        if(Math.abs(value)>=3){
          vidSum-=.5
        } else if(Math.abs(value)==2){
          vidSum-=.3
        } else {
          vidSum+=.5
        }
      } else if (index===2){
        if(Math.abs(value)>=3){
          vidSum-=.5
        } else if(Math.abs(value)==2){
          vidSum-=.3
        } else {
          vidSum+=.5
        }
      } else if (index===3){
        if(Math.abs(value)>=3){
          vidSum-=.5
        } else if(Math.abs(value)==2){
          vidSum-=.3
        } else {
          vidSum+=.5
        }
      }
    })
    // vidSum=vidSum/this.state.videoScore.length
    let totalScore=analysisScore+vidSum


    console.log("Star Score:", totalScore)
    if(totalScore>5){
      return 5
    } else if(totalScore<0){
      return 0
    } else {
      return Math.round(totalScore)
    }
  }



  legendFormatter(value) {

    return <span style={{ fontSize:20 }}>{value}</span>;
  }

  render(){
    if(this.props.overall){
      return(
        <div>
          <Col>
            <Row>
              <Col className="centered">
                <Row>
                  <h1>
                    <div>Overall Score</div>
                    <div><StarRatingComponent
                        name="overall"
                        starCount={5}
                        value={this.getStarRating()}
                        editing={false}
                      /></div>
                  </h1>
                </Row>
              </Col>
            </Row>
            <Row>
            {/* Left Column */}
              <Col sm={6}>
                <Card className = "shadow" style={{marginBottom: "10px"}}>
                  <Card.Header as="h3" style={{backgroundColor:"#08AEEA", color:"white"}}>
                      <div>{"Question Response"}</div>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <Col><div className="analysisText">{this.state.txt}</div></Col>
                    </Card.Text>
                  </Card.Body>
                </Card>
                <Card className = "shadow" style={{marginBottom: "10px"}}>
                  <Card.Header as="h3" style={{backgroundColor:"#08AEEA", color:"white"}}>Tones Detected</Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <Row style={{paddingLeft: 30}}>
                        <RadarChart cx={300} cy={250} outerRadius={150} width={700} height={500} data={this.state.analysis}>
                          <PolarGrid/>
                          <PolarAngleAxis dataKey="tone_name" tick={{fontSize: 30}}/>
                          <PolarRadiusAxis />
                          <Radar name="score" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                        </RadarChart>
                      </Row>
                    </Card.Text>
                  </Card.Body>
                </Card>
                <Card className = "shadow" style={{marginBottom: "10px"}}>
                <Card.Header style={{backgroundColor:"#08AEEA", color:"white"}} as="h3">Filler Words</Card.Header>
                <Card.Body>
                  <Card.Text>
                      <h1 className = "analysisText text-center">
                        Words such as "like" or "um":</h1>
                      <h1>
                        {this.props.hesitations[0]}
                      </h1>
                      <br/>
                      <h1 className = "analysisText text-center">
                        {(this.props.hesitations[0]<6) ? "That's not that many. Keep it up!": "Try taking a few seconds before answering to give a more confident response!"}
                      </h1>
                    </Card.Text>
                  </Card.Body>
                </Card>

              </Col>

              {/* Right Column */}
              <Col sm={6}>
                <Row>
                    <Card className = "shadow" style={{marginBottom: "10px"}}>
                      <Card.Header as="h3" style={{backgroundColor:"#08AEEA", color:"white"}}>Emotion Over Time</Card.Header>
                      <Card.Body>
                        <Card.Text>
                          <Row>
                            <Col>
                              <AreaChart width={600} height={500} data={this.formatVideoScores()} stackOffset="expand"
                                  margin={{top: 10, right: 30, left: 0, bottom: 0}} >
                                <XAxis dataKey="ind" tick={{fontSize: 20}}/>
                                <YAxis tickFormatter={this.toPercent} tick={{fontSize: 20}}/>
                                <Legend formatter={this.legendFormatter}/>
                                <Tooltip content={this.renderTooltipContent}/>
                                <Area type='monotone' dataKey='joy' stackId="1" stroke='#82ca9d' fill='#82ca9d' />
                                <Area type='monotone' dataKey='sorrow' stackId="1" stroke='#8884d8' fill='#8884d8' />
                                <Area type='monotone' dataKey='anger' stackId="1" stroke='#ffc658' fill='#ffc658' />
                                <Area type='monotone' dataKey='surprise' stackId="1" stroke='#FF8042' fill='#FF8042' />
                            </AreaChart>
                          </Col>
                          </Row>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    <Card className = "shadow" style={{marginBottom: "10px"}}>
                    <Card.Header as="h3" style={{backgroundColor:"#08AEEA", color:"white"}}>Video Feedback</Card.Header>
                      <Card.Body>
                        <Card.Text>
                            <Col>
                              <div className="analysisText">{this.videoFeedback()}</div>
                            </Col>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    <Card className = "shadow" style={{marginBottom: "10px"}}>
                    <Card.Header as="h3" style={{backgroundColor:"#F74356", color:"white"}}>Things to Improve</Card.Header>
                    <Card.Body>
                      <Card.Text>
                          <Col>
                            <ul>
                              {this.getNegFeedback().map((value,index)=>{
                                return(<li className="analysisText">{value}</li>)
                              })}
                            </ul>
                          </Col>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  <Card className = "shadow" style={{marginBottom: "10px"}}>
                  <Card.Header style={{backgroundColor:"#388e3c", color:"white"}} as="h3">Things You Did Well</Card.Header>
                  <Card.Body>
                    <Card.Text>
                        <Col>
                          <ul>
                            {this.getPosFeedback().map((value,index)=>{
                              return(<li className="analysisText">{value}</li>)
                            })}
                          </ul>
                        </Col>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  </Row>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Card className = "shadow" style={{marginBottom: "10px"}}>
                    <Card.Header as="h3" style={{backgroundColor:"#08AEEA", color:"white"}}>Word Timings</Card.Header>
                      <Card.Body>
                        <BarChart
                          width={1000}
                          height={400}
                          data={this.sortData()}
                          margin={{
                            top: 15, right: 20, left: 20, bottom: 5,
                          }}
                        >
                          <XAxis height={50} label="Time" dataKey="time" />
                          <YAxis >
                          <Label
                            value="Word Hesitation"
                            position="insideLeft"
                            angle={-90}
                            style={{ textAnchor: 'middle' }}
                            />
                          </YAxis>
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="hesitation" stroke="#8884d8" />
                        </BarChart>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </div>
        );
    } else {
    return(
      <div>
        <Col>
          <Row>
            <Col className="centered">
              <Row>
                <h1>
                  <div>Question Score</div>
                  <div><StarRatingComponent
                      name="overall"
                      starCount={5}
                      value={this.getStarRating()}
                      editing={false}
                    /></div>
                </h1>
              </Row>
            </Col>
          </Row>
          <Row>
            {/* Left Column */}
              <Col sm={6}>
                <Card className = "shadow" style={{marginBottom: "10px"}}>
                  <Card.Header as="h3" style={{backgroundColor:"#08AEEA", color:"white"}}>Tones Detected</Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <Row style={{paddingLeft: 30}}>
                        <RadarChart cx={300} cy={250} outerRadius={150} width={700} height={500} data={this.state.analysis}>
                          <PolarGrid/>
                          <PolarAngleAxis dataKey="tone_name" tick={{fontSize: 30}}/>
                          <PolarRadiusAxis />
                          <Radar name="score" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                        </RadarChart>
                      </Row>
                    </Card.Text>
                  </Card.Body>
                </Card>
                <Card className = "shadow" style={{marginBottom: "10px"}}>
                  <Card.Header as="h3" style={{backgroundColor:"#08AEEA", color:"white"}}>
                    <div>{"Question Response"}</div>
                    </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <Col><div className="analysisText">{this.state.txt}</div></Col>
                    </Card.Text>
                  </Card.Body>
                </Card>
                <Card className = "shadow" style={{marginBottom: "10px"}}>
                  <Card.Header as="h3" style={{backgroundColor:"#388e3c", color:"white"}}>Things You Did Well</Card.Header>
                  <Card.Body>
                    <Card.Text>
                        <Col>
                          <ul>
                            {this.getPosFeedback().map((value,index)=>{
                              return(<li className="analysisText">{value}</li>)
                            })}
                          </ul>
                        </Col>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              {/* Right Column */}
              <Col sm={6}>
                {true ? <Row>
                      <Card className = "shadow" style={{marginBottom: "10px"}}>
                        <Card.Header as="h3" style={{backgroundColor:"#08AEEA", color:"white"}}>Video Response</Card.Header>
                        <Card.Body>
                            <div className = "container">
                              <img src={this.props.img} alt = "face"/>
                              <button className = "butt"><FontAwesomeIcon icon={faPlayCircle} size="3x" style={{color: "rgba(0,0,0,0.8)"}}/></button>
                            </div>
                        </Card.Body>
                      </Card>
                    </Row>: null}
                <Row>
                    <Card className = "shadow" style={{marginBottom: "10px"}}>
                      <Card.Header as="h3" style={{backgroundColor:"#08AEEA", color:"white"}}>Emotion Over Time</Card.Header>
                      <Card.Body>
                        <Card.Text>
                          <Row>
                            <Col>
                              <AreaChart width={600} height={500} data={this.formatVideoScores()} stackOffset="expand"
                                  margin={{top: 10, right: 30, left: 0, bottom: 0}} >
                                <XAxis dataKey="ind" tick={{fontSize: 20}}/>
                                <YAxis tickFormatter={this.toPercent} tick={{fontSize: 20}}/>
                                <Legend formatter={this.legendFormatter}/>
                                <Tooltip content={this.renderTooltipContent}/>
                                <Area type='monotone' dataKey='joy' stackId="1" stroke='#82ca9d' fill='#82ca9d' />
                                <Area type='monotone' dataKey='sorrow' stackId="1" stroke='#8884d8' fill='#8884d8' />
                                <Area type='monotone' dataKey='anger' stackId="1" stroke='#ffc658' fill='#ffc658' />
                                <Area type='monotone' dataKey='surprise' stackId="1" stroke='#FF8042' fill='#FF8042' />
                              </AreaChart>
                            </Col>
                          </Row>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    <Card className = "shadow" style={{marginBottom: "10px"}}>
                    <Card.Header as="h3" style={{backgroundColor:"#08AEEA", color:"white"}}>Video Feedback</Card.Header>
                      <Card.Body>
                        <Card.Text>
                            <Col>
                              <div className="analysisText">{this.videoFeedback()}</div>
                            </Col>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                    <Card className = "shadow" style={{marginBottom: "10px"}}>
                    <Card.Header as="h3" style={{backgroundColor:"#F74356", color:"white"}}>Things to Improve</Card.Header>
                    <Card.Body>
                      <Card.Text>
                          <Col>
                            <ul>
                              {this.getNegFeedback().map((value,index)=>{
                                return(<li className="analysisText">{value}</li>)
                              })}
                            </ul>
                          </Col>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                  </Row>
                </Col>
              </Row>
            </Col>
        </div>
      );
    }
  }

}

export default Report;

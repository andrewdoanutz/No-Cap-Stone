import React, { useState,useEffect } from 'react';
import axios from 'axios'
import {Accordion, Card, Row, Col, Button} from 'react-bootstrap';
import Report from './../components/Report'
import { GridLoader } from "react-spinners";

function useAsyncHook(name){
  const [transcript,setTranscript]=useState([])
  const [loading,setLoading]=useState(true)
  const [videoScores,setVideoScores]=useState([])
  const [videos,setVideos]=useState([])
  const [timestamps,setTimestamps]=useState([])
  const [questions,setQuestions]=useState([])
  const [hesitations,setHesitations]=useState([])
  const [img, setImg] = useState(null)
  useEffect(() => {
    async function getDBInfo(){
      const res = await axios.post('http://localhost:3001/db/readUserInfo', {username: name})
      console.log(res)
      setTranscript(res["data"]["Items"]["0"]["transcripts"])
      setVideoScores(res["data"]["Items"]["0"]["videoscores"])
      setVideos(res["data"]["Items"]["0"]["videos"])
      setTimestamps(res["data"]["Items"]["0"]["wordtimings"])
      setQuestions(res["data"]["Items"]["0"]["questions"])
      setHesitations(res["data"]["Items"]["0"]["hesitations"])
      setImg(res["data"]["Items"]["0"]["img"])
      setLoading(false)
    }

    getDBInfo(name)
  }, [name])
  return [transcript,loading,videoScores,videos,timestamps,questions,hesitations, img]
}

function combineScores(scores){
  let joy=[]
  let sorrow=[]
  let anger=[]
  let surprise=[]
  scores.map((value) =>{
    value.map((a,index)=>{
      a.map((value)=>{
        if (index===0){
          joy.push(value)
        } else if (index===1){
          sorrow.push(value)
        } else if (index===2){
          anger.push(value)
        } else if (index===3){
          surprise.push(value)
        }
      })
    })
  })
  return [joy,sorrow,anger,surprise]
}
const postAnalysis = (props) => {
  console.log(props)
  let [transcript,loading,videoScores,videos,timestamps,questions,hesitations,img]=useAsyncHook(props.location.state.username)
  if(questions.length===0){
    let temp=[]
    transcript.map((val, index)=>{
      temp.push(index+1)
    })
    questions=temp
  }
  // constructor(props){
  //   super(props);
  //   this.state={
  //     transcript:[
  //       "first text, something about being upset often and nonconfident in team performance",
  //
  //         "second text, Happy when things work out and I hope for the best for our team",
  //
  //         "in most situations our team worked well under pressure. When ever we didn't communicate we roked for solutions"
  //     ],
  //
  //
  //     txt: "When Working on my group project, a team member was not carrying their own weight. They weren't completing assingments or showing up to meetings. To solve the problem we were direct with them in a positive wayy and tried to work with them in person",
  //   }
  //   //this.getCandidate()
  // }

    // if(!DBInfo){
    //   return(
    //     <div className="homeBox">waiting</div>
    //   )
    // } else {


    if(loading){
      return(
        <div className="profiles">
          <Row>
            <GridLoader
            size={20}
            //size={"150px"} this also works
            color={"#007ed9"}
            loading={true}
          />
        </Row>
        </div>
      )
    } else {
      let overallTranscript = ""
      transcript.forEach(i=>{
        overallTranscript+=i+" "
      })
      console.log(transcript)
      const overallVideoScores = combineScores(videoScores)
      console.log(overallVideoScores)
        return(
          <div className="homeBox" style={{width:"95%",paddingLeft:"4%",paddingTop:"7%"}}>
            <Card>
              <Card.Header as="h1" className = "bg-dark" style={{color:"white"}}>
                Post Analysis Report for {props.location.state.username}
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col>
                    <Accordion defaultActiveKey={-1}>
                      <Card>
                        <Card.Header>
                          <Accordion.Toggle as={"h1"} className="accordionButton" eventKey={-1}>
                            <h2> Overall Report </h2>
                          </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={-1}>
                          <Card.Body>
                            <Report overall={true} responses={overallTranscript} videoScore={overallVideoScores} timestamps={timestamps} username={props.location.state.username} hesitations={hesitations} img={img}/>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      {transcript.map(function(text, index){
                        return (
                          <Card>
                            <Card.Header>
                              <Accordion.Toggle as={"h1"} className="accordionButton" eventKey={index}>
                                <h2 > Question: {questions[index]} </h2>
                              </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey={index}>
                              <Card.Body>
                                <Report source={props.location.state.source} responses={text} videoURL={videos[index]} videoScore={videoScores[index]} username={props.location.state.username} index = {index} hesitations={hesitations} img={img}/>
                              </Card.Body>
                            </Accordion.Collapse>
                          </Card>
                          )
                        })
                      }
                    </Accordion>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
        </div>
      )
  }

}
export default postAnalysis;

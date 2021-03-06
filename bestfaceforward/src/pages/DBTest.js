import React, { Component } from 'react'


import "../css/about.css";
import axios from 'axios'

let Database = require('../components/Database')
export default class DBTest extends Component{

  writeAnalysis = () => {
    axios.post('http://localhost:3001/db/toneAnalysis')
  }

  writeTranscript = () => {
    axios.post('http://localhost:3001/db/writeTranscript' , {q:"jingles",u:"practice"})
  }

  resetPractice = () =>{
    axios.post('http://localhost:3001/db/resetPractice')
  }

  writeQuestion = () => {
    axios.post('http://localhost:3001/db/writeQuestion' , {q:"jingles",u:"practice"})
  }


//TODO: change input to array
  writeAudioAnalysis = (props) => {
    axios.post('http://localhost:3001/db/writeAudioAnalysis', {username: this.props.username, speed: "talking quickly"})
  }

  readAudioAnalysis = () => {
    axios.post('http://localhost:3001/db/readAudioAnalysis', {username: "Bik Nandy", index:0})
  }
  readTranscript = () => {
    axios.post('http://localhost:3001/db/readTranscript' , {username:"ryan"})
  }

  readQuestions = () => {
    axios.post('http://localhost:3001/db/readQuestions' , {username:"practice"}).then(res=>{console.log("Response: ",res.data[0])})
  }



  writeLiveScore = () => {
    axios.post('http://localhost:3001/db/writeLiveScore',{u:"practice",s:"5"})
  }

  readLiveScore = () => {
    axios.post('http://localhost:3001/db/readLiveScore' , {username:"practice"})
  }

  render(){
   // Database.createTable()
    // Database.addUser()
    // Database.queryUser("tim2167")
    // Database.verifyUser()
  //  Database.updateUser()
   // Database.queryUser()
   // Database.deleteUser()
   //this.writeAnalysis()
   //this.writeTranscript()
   //this.resetPractice()

   //this.writeQuestion()
   this.readTranscript()
   this.readQuestions()
   this.writeLiveScore()
  // this.readLiveScore()

  // this.writeQuestion()
  //this.writeAudioAnalysis("Ryan Gormley")
  //axios.post('http://localhost:3001/db/writeAudioAnalysis', {username: "Ryan Gormley", speed: "talking quickly"})

  //this.readAudioAnalysis()

    return(
      <div>
        <div> TestArea </div>
        <div> TestArea </div>
        <div> TestArea </div>
        <div> TestArea </div>
        <div> TestArea </div>
        <div>Check console to see test db stuff</div>
      </div>
    )
  }


}

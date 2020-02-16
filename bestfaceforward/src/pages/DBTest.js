import React, { Component } from 'react'


import "../css/about.css";
import axios from 'axios'

let Database = require('../components/Database')
export default class DBTest extends Component{

  writeAnalysis = () => {
    axios.post('http://localhost:3001/db/writeToneAnalysis')
  }

  readAnalysis = () => {
    axios.post('http://localhost:3001/db/readToneAnalysis').then(res=>{
      console.log("STUFF returned from DB1:", res)
      // console.log("STUFF returned from DB2:", res.data)
      // console.log("STUFF returned from DB3:", res.data.Items[0])
      // console.log("STUFF returned from DB4:", res.data.Items[0].analysis)
    })
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
   //this.readAnalysis()
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

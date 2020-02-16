import React, { Component } from 'react'


import "../css/about.css";
import axios from 'axios'

let Database = require('../components/Database')
export default class DBTest extends Component{

  writeAnalysis = () => {
    axios.post('http://localhost:3001/db/toneAnalysis')
  }


  render(){
   // Database.createTable()
    // Database.addUser()
    // Database.queryUser("tim2167")
    // Database.verifyUser()
  //  Database.updateUser()
   // Database.queryUser()
   // Database.deleteUser()
   this.writeAnalysis()
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

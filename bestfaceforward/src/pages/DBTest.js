import React, { Component } from 'react'

let Database = require('../components/Database')
export default class DBTest extends Component{
  render(){
   // Database.createTable()
    Database.addUser()
    Database.queryUser("tim2167")
    Database.verifyUser()
  //  Database.updateUser()
   // Database.queryUser()
   // Database.deleteUser()
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

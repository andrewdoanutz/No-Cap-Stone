import React, { Component } from 'react'
import Profile from '../components/profile'


import "../css/about.css";


export default class About extends Component {
  render() {
    return (
      
      <div className="profiles">
        <div className="profile">
        <Profile image="https://i.ibb.co/Rv4NXCs/DOAN.png"
        name="Andrew Doan"
        yearMajor="UCSB 3rd Year Computer Engineer"
        linkedIn="https://www.linkedin.com/in/andrewadoan/"
        />
        </div>
        
      </div>
    )
  }
}

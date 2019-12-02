import React, { Component } from 'react'
import Cookies from 'universal-cookie';
import "../css/login.css";

let cookies = new Cookies();
export default class Dashboard extends Component {
  render() {
    console.log(cookies.get('login'));
    return (
      <div className = "homeBox">
        <div className = "homeHead"> Dashboard</div>

      </div>
    )
  }
}

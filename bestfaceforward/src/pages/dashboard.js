import React, { Component } from 'react'
import Cookies from 'universal-cookie';

let cookies = new Cookies();
export default class Dashboard extends Component {
  render() {
    console.log(cookies.get('login'));
    return (
      <div>
        <div>Dashboard</div>
        <div>Dashboard</div>
        <div>Dashboard</div>
        <div>Dashboard</div>
        <div>Dashboard</div>
      </div>
    )
  }
}

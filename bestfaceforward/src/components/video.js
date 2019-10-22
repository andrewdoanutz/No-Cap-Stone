import React, { Component } from 'react'

import MeetingForm from './MeetingForm'
import Call from './Call'

export default class Video extends Component {
  render() {
    return (
      <div>
        <div> TEST </div>
        <div> TEST </div>
        <div> TEST </div>
        <div> TEST </div>
        <div className="App">
          <MeetingForm />
          <Call />
        </div>
      </div>

    );
  }
}

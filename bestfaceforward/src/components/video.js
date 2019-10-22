import React, { Component } from 'react'

import MeetingForm from './MeetingForm'
import Call from './Call'

class Video extends Component {

  //add a state for meeting name and method
  constructor(props){
    super(props);
    this.state = {
      meeting: ''
    }
  }

  selectMeeting = meeting => {
    this.setState({meeting});
  };

  render() {
    return (
      <div>
        <div> TEST </div>
        <div> TEST </div>
        <div> TEST </div>
        <div> TEST </div>
        <div> TEST </div>
        <div> TEST </div>
        <div className="Video">
          <MeetingForm selectMeeting={this.selectMeeting}/>
          <Call meeting = {this.state.meeting}/>
        </div>
      </div>

    );
  }
}

export default Video;

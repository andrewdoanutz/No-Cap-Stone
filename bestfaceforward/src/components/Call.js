import React, { Component } from "react";
import AgoraRTC from 'agora-rtc-sdk';

//random number generation for user ID
const USER_ID = Math.floor(Math.random() * 1000001);

export default class Call extends Component {

  //new instance obejct for Agora stream
  localStream = AgoraRTC.createStream({
    streamID: USER_ID,
    audio: true,
    video: true,
    screen: false
  });

  componentDidMount() {
    this.initLocalStream();
  }

  initLocalStream = () => {
    let me = this;
    me.localStream.init(
      function() {
        console.log("getUserMedia successfully");
        me.localStream.play("agora_local");
      },
      function(err) {
        console.log("getUserMedia failed", err);
      }
    );
  };

  render() {
    return (
      <div>
        <div id="agora_local" style={{ width: "400px", height: "400px" }} />
      </div>
    );
  }
}

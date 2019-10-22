import React, { Component } from "react";
import AgoraRTC from 'agora-rtc-sdk';

//create a client
var client = AgoraRTC.createClient({ mode: "live", codec: "h264" });

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

  state = {
    remoteStreams: {}
  }

  componentDidMount() {
    //initialize stream
    this.initLocalStream();

    //initialize client
    this.initClient();
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.meeting !== this.props.meeting && this.props.meeting !== "") {
      this.joinChannel();
    }
  }

  initLocalStream = () => {
    let me = this;

    //local stream that goes into "agora_local" div to get media from computer
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

  initClient = () => {
    client.init(
      "f0c74c653f584d329d2f013bdecea4f3",
      function() {
        console.log("Client init");
      },
      function(err){
        console.log("Client failed. Error: ", err);
      }
    );

    this.subscribeToClient();
  };

  subscribeToClient = () => {
    let me = this;
    client.on("stream-added", me.onStreamAdded);
    client.on("stream-subscribed", me.onRemoteClientAdded);

    //client.on("stream-removed", me.onStreamRemoved);

    //client.on("peer-leave", me.onPeerLeave);
   };

  onStreamAdded = evt => {
    let me = this;
    let stream = evt.stream;
    console.log("New stream added: " + stream.getId());

    //callback to set state function
    me.setState(
      {
        //new remote Stream to state
        remoteStreams: {
          ...me.state.remoteStream,
          [stream.getId()]: stream
        }
      },
      () => {
        // Subscribe after new remoteStreams state set to make sure
        // new stream dom el has been rendered for agora.io sdk to pick up
        client.subscribe(stream, function(err) {
          console.log("Subscribe stream failed", err);
        });
      }
    );
  }

  joinChannel = () => {
    let me = this;
    client.join(
      null,
      me.props.meeting,
      USER_ID,
      function(uid) {
        console.log("User " + uid + " joined meeting");
        client.publish(me.localStream, function(err) {
          console.log("Stream Error: " + err);
        });

        client.on("stream-published", function(evt) {
          console.log("Stream published successfully");
        });
      },
      function(err) {
        console.log("Join meeting failed", err);
      }
    );
  };

  onRemoteClientAdded = evt => {
    let me = this;
    let remoteStream = evt.stream;
    me.state.remoteStreams[remoteStream.getId()].play(
      "agora_remote " + remoteStream.getId()
    );
  };

  render() {
    return (
      <div>
        <div id="agora_local" style={{ width: "400px", height: "400px" }} />
        {Object.keys(this.state.remoteStreams).map(key => {
          let stream = this.state.remoteStreams[key];
          let streamId = stream.getId();
          return (
            <div
              key={streamId}
              id={`agora_remote ${streamId}`}
              style={{ width: "600px", height: "600px" }}
            />
          );
        })}
      </div>
    );
  }
}

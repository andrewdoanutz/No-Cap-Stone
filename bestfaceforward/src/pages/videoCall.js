import React, { Component, useState, useCallback, useEffect} from 'react'
import VideoChat from '../components/VideoChat.js'
import {Row, Col,Button} from 'react-bootstrap';




const VideoCall = (props) => {
  const [token, setToken] = useState(null);
  console.log("videocall",props.location.state.name)
  useEffect(() => {
    async function fetchData (){

      const data = await fetch('/video/token', {
        method: 'POST',
        body: JSON.stringify({
          identity: props.location.state.name,
          room: props.location.state.id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json());
      setToken(data.token);
    }
    fetchData()

  },[]);
  const handleLogout=useCallback(event=>{
    setToken(null)
    
    
  })
    if (token){
      return (
          <div  className="vertical-center large-vertical-space centered" style={{width:"100%"}}>
            <VideoChat handleLogout={handleLogout} roomName = {props.location.state.id} token = {token} name = {props.location.state.name}/>
          </div>
      )
    }else{
      return (
        <div>
        </div>
      )
    }


}

export default VideoCall;

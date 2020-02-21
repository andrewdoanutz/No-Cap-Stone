import React, { Component, useState, useCallback, useEffect} from 'react'
import VideoChat from '../components/VideoChat.js'
import {Row, Col} from 'react-bootstrap';




const VideoCall = (props) => {
  const [token, setToken] = useState(null);

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

  },[])

    if (token){
      return (
          <div className="homebox">
              <Row>
                  <Col>
                      <VideoChat roomName = {props.location.state.id} token = {token}/>
                  </Col>
              </Row>
          </div>
      )
    }else{
      return (
        <div className="homebox">
        </div>
      )
    }


}

export default VideoCall;

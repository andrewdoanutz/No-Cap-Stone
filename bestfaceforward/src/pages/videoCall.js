import React, { Component } from 'react'
import NewWindow from 'react-new-window'


import VideoComponent from '../components/VideoComponent.js'

import '../css/login.css';





export default class VideoCall extends Component {
    render() {
        return (
        <div>
            <div className="homeBox">
                <NewWindow>
                    <VideoComponent />
                </NewWindow>
                <div className="homeHead">Your video call is starting</div>
            </div>
        </div>
        )
    }
}

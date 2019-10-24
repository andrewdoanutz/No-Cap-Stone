import React, { Component } from 'react'
import NewWindow from 'react-new-window'
import '../css/login.css';
import Video from '../components/video.js'

export default class VideoCall extends Component {
    render() {
        return (
        <div>
            <div className="homeBox">
                <NewWindow>
                    <Video />
                </NewWindow>
                <div className="homeHead">Your video call should have started</div>
            </div>
        </div>
        )
    }
}

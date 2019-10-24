import React, { Component } from 'react'
import NewWindow from 'react-new-window'
import '../css/login.css';


export default class VideoCall extends Component {
    render() {
        return (
        <div>
            <div className="homeBox">
                <NewWindow>
                    <h1>Hi 👋</h1>
                </NewWindow>
                <div className="homeHead">Your video call should have started</div>
            </div>
        </div>
        )
    }
}

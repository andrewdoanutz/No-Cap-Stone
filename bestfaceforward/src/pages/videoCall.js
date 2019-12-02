import React, { Component } from 'react'


import VideoChat from '../components/VideoChat.js'
import {Row, Col} from 'react-bootstrap';

import '../css/login.css';




export default class VideoCall extends Component {
    render() {
        return (
            <div className="homebox">
                <Row>
                    <Col>
                        <VideoChat/>
                    </Col>
                </Row>
            </div>
        )
    }
}

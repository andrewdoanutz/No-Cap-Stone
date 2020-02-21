import React, { Component } from 'react'
import Profile from '../components/profile'

import {Col,Row} from 'react-bootstrap';


export default class About extends Component {
    render() {
        return (
            <div>
                <Row style={{margin:"4%"}}>
                    <Col>
                        <Row>
                            <Profile 
                            image="https://i.ibb.co/Rv4NXCs/DOAN.png"
                            name="Andrew Doan"
                            yearMajor="UCSB 4th Year Computer Engineer"
                            linkedIn="https://www.linkedin.com/in/andrewadoan/"
                            />
                        </Row>
                        <Row>
                            <Profile image="https://i.ibb.co/Rv4NXCs/DOAN.png"
                            name="Adjon Tahiraj"
                            yearMajor="UCSB 4th Year Computer Engineer"
                            linkedIn="https://www.linkedin.com/in/andrewadoan/"
                            />
                        </Row>
                        <Row>
                        <Profile image="https://i.ibb.co/Rv4NXCs/DOAN.png"
                        name="Ryan Gormley"
                        yearMajor="UCSB 4th Year Computer Science"
                        linkedIn="https://www.linkedin.com/in/andrewadoan/"
                        />
                        </Row>
                    </Col>
                    <Col>
                        <Row style={{marginTop:"25%"}}>
                            <Profile image="https://i.ibb.co/Rv4NXCs/DOAN.png"
                            name="Tim Chang"
                            yearMajor="UCSB 4th Year Computer Engineer"
                            linkedIn="https://www.linkedin.com/in/andrewadoan/"
                            right={true}
                            />
                        </Row>
                        <Row>
                            <Profile image="https://i.ibb.co/Rv4NXCs/DOAN.png"
                            name="Bik Nandy"
                            yearMajor="UCSB 4th Year Computer Engineer"
                            linkedIn="https://www.linkedin.com/in/andrewadoan/"
                            right={true}
                            />
                        </Row>
                    </Col>
                </Row>
            </div>
    )
}
}

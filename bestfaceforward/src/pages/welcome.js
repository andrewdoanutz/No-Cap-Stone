import React, { useState, useCallback } from 'react';
import {Button, Row, Container, Col, Card} from 'react-bootstrap';
import {BrowserRouter as Router, Link } from "react-router-dom";

const Welcome = () => {
  const setCandidate = event => {
    localStorage.setItem('candidate', 1);
  };
  const setInterviewer = event => {
    localStorage.setItem('candidate', 0)
  };
  return (
    <div className = "background-img">
      <div>
          <Row style = {{height: "100vh"}}>
            <Col className = "horizontal-center my-auto text-white">
              <Card className = "homepage-card">
                <Card.Body>


              <h1 className = "large-text">Are you a &nbsp;
                <Link to={{
                  pathname: '/candidate'
                }}>
                  <>
                    <style type="text/css">
                    {`
                      .btn-flat-homepage {
                        background-color: #08AEEA;
                        color: white;
                      }

                      .btn-xxl-homepage {
                        padding: 1rem 1.5rem;
                        font-size: x-large !important;
                        font-weight: bold;
                      }
                      `}
                    </style>

                    <Button variant="flat-homepage" size="xxl-homepage" onClick = {setCandidate}>
                      candidate
                    </Button>
                  </>
                </Link>

                &nbsp; or an &nbsp;

                <Link to={{
                  pathname: '/login'
                }}>
                  <>
                    <Button variant="flat-homepage" size="xxl-homepage" onClick = {setInterviewer}>
                      interviewer
                    </Button>
                  </>
                </Link>
                &nbsp;?
              </h1>
              </Card.Body>
            </Card>
            </Col>
          </Row>

      </div>
    </div>
  );
}

export default Welcome;

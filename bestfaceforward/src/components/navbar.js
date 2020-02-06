import React from "react";
import bro1 from "../images/icon.png";
import {Navbar, Nav} from 'react-bootstrap';

import "../css/navbar.css"

export default class NavBar extends React.Component {
  render() {
    return (
      <div>
        <Navbar variant="dark" expand="xl" fixed="top" className="navbar navbar-static-top">
          <Navbar.Brand href="/login">
            <img
              alt=""
              src={bro1}
              width="35"
              height="35"
              className="navImage"
            />
            <Navbar.Text className="navbarTitle">BestFaceForward</Navbar.Text>
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link href="/login" className="link">Login</Nav.Link>
              <Nav.Link href="/postAnalysis" className="link">Analysis</Nav.Link>
              <Nav.Link href="/practice" className="link">Practice</Nav.Link>
              <Nav.Link href="/about" className="link">About Us</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

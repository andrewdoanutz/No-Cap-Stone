import React from "react";
import bro1 from "../images/icon.png";
import {Navbar, Nav} from 'react-bootstrap';

import "../css/navbar.css"

export default class NavBar extends React.Component {
  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark" expand="xl" fixed="top" className="navbar navbar-static-top">
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
              <Nav.Item><Nav.Link href="/login" className="link">Login</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link href="/videoCall" className="link">Video</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link href="/report" className="link">Analysis</Nav.Link></Nav.Item>
              <Nav.Item><Nav.Link href="/about" className="link">About Us</Nav.Link></Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

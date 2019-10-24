import React from "react";
import bro1 from "../images/icon.png";
import {Navbar, Nav} from 'react-bootstrap';

import "../css/navbar.css"

export default class NavBar extends React.Component {
  render() {
    return (
      <div>
<<<<<<< HEAD
        <div
          className="navbar default-default navbar-fixed-top"
          role="navigation"
        >
          <div className="container">
            <div className="navbar-header">
              <NavLink to="/" className="navbar-brand">
                <img className="navImage" src={bro1}/>
                <div className="brandbox">
                <strong>
                  Best Face Forward
                </strong>
                </div>
              </NavLink>


              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#navbar-collapse"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
            </div>
            <div className="collapse navbar-collapse" id="navbar-collapse">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/about">About Us</NavLink>
                </li>
                <li>
                  <NavLink to="/RTSA">RTSA</NavLink>
                </li>
                <li>
                  <NavLink to="/video">Video</NavLink>
                </li>
                <li>
                  <NavLink to="/S2TP">S2TP</NavLink>
                </li>
                <li>
                  <NavLink to="/S2TRT">S2TRT</NavLink>
                </li>
                <li>
                  <NavLink to="/display">Display</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
=======
        <Navbar variant="light" expand="xl" fixed="top" className="navbar">
          <Navbar.Brand href="/login">
            <img
              alt=""
              src={bro1}
              width="50"
              height="50"
              className="navImage"
            />
            <Navbar.Text className="navbarTitle">BestFaceForward</Navbar.Text>
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link href="/login" className="link">Login</Nav.Link>
              <Nav.Link href="/about" className="link">About Us</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
>>>>>>> dev
      </div>
    );
  }
}

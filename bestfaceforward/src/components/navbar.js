import React from "react";
import { NavLink } from "react-router-dom";
import bro1 from "../images/icon.png";
import "../css/navbar.css";

export default class NavBar extends React.Component {
  render() {
    return (
      <div>
        <div
          className="navbar default-default navbar-fixed-top"
          role="navigation"
        >
          <div className="container">
            <div className="navbar-header">
              <NavLink to="/login" className="navbar-brand">
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
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

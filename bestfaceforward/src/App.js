import React, { Component } from 'react';
import { BrowserRouter, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './components/navbar';
import Login from './pages/login';
import About from './pages/aboutUs'
import Dash from './pages/dashboard'
import MakeAcct from './pages/makeAcct'
import VideoCall from './pages/videoCall'
import Timer from './pages/timer'
import DBTest from './pages/DBTest'
import Practice from './pages/practice'
import Report from './components/Report'
import PostAnalysis from './pages/postAnalysis'

import 'bootstrap/dist/css/bootstrap.min.css';
import './css/App.css';

class App extends Component {

  render() {
    return (
      <div>
      <BrowserRouter>
        <div>
          <NavBar/>
          <Route exact path="/about" component={About} />
          <Route  path="/login" component={Login} />
          <Route  path="/dashboard" component={Dash} />
          <Route  path="/makeacct" component={MakeAcct} />
          <Route  exact path="/videocall" component={VideoCall} />
          <Route  path="/timer" component={Timer} />
          <Route  path="/dbtest" component={DBTest} />
          <Route  path="/report" component={Report} />
          <Route  path="/postAnalysis" component={PostAnalysis} />
          <Route  path="/api/transcript"/>
          <Route  path="/practice" component={Practice}/>
        </div>
      </BrowserRouter>
       </div>
    );
  }
}

export default App;

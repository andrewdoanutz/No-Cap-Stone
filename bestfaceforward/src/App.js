import React, { Component } from 'react';
import { BrowserRouter, Route} from "react-router-dom";

import NavBar from './components/navbar';
import Login from './pages/login';
import About from './pages/aboutUs'
import Dash from './pages/dashboard'
import MakeAcct from './pages/makeAcct'
import VideoCall from './pages/videoCall'
import Timer from './pages/timer'
import DBTest from './pages/DBTest'
import Practice from './pages/practice'
import PostAnalysis from './pages/postAnalysis'
import Welcome from './pages/welcome'
import Candidate from './pages/candidate'
import DummyAdjon from './pages/dummyAdjon'

import 'bootstrap/dist/css/bootstrap.css';
import './css/App.css';

class App extends Component {

  render() {
    return (
      <div>
      <BrowserRouter>
        <div>
          <NavBar/>
          <Route exact path='/' component={Welcome}/>
          <Route exact path="/about" component={About} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dash} />
          <Route exact path="/makeacct" component={MakeAcct} />
          <Route exact path="/videocall" component={VideoCall} />
          <Route exact path="/timer" component={Timer} />
          <Route exact path="/dbtest" component={DBTest} />
          <Route exact path="/postAnalysis" component={PostAnalysis} />
          <Route exact path="/api/transcript"/>
          <Route exact path="/practice" component={Practice}/>
          <Route exact path="/candidate" component={Candidate}/>
          <Route exact path="/adjon" component={DummyAdjon}/>
        </div>
      </BrowserRouter>
       </div>
    );
  }
}

export default App;

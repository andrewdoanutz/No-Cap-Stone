import React, { Component } from 'react';
import { BrowserRouter, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
//import Navbar from 'react-bootstrap/Navbar';

<<<<<<< HEAD
import NavBar from './components/navbar'
import Login from './components/login.js'
import About from './components/aboutus'
import RTSA from './components/RTSA'
import Video from './components/Video'
import S2TP from './components/S2TP'
import S2TRT from './components/S2TRT'
import Display from './components/display'
=======
import NavBar from './components/navbar';
import Login from './pages/login';
import About from './pages/aboutUs'
import Dash from './pages/dashboard'
import MakeAcct from './pages/makeAcct'
import VidCall from './pages/videoCall'

import 'bootstrap/dist/css/bootstrap.min.css';
>>>>>>> dev
import './css/App.css';

class App extends Component {

  render() {
    return (
      <div>
      <BrowserRouter>
        <div>
          <NavBar/>
<<<<<<< HEAD
          <Route exact path="/RTSA" component={RTSA} />
          <Route exact path="/Video" component={Video} />
          <Route exact path="/S2TP" component={S2TP} />
          <Route exact path="/S2TRT" component={S2TRT} />
          <Route exact path="/display" component={Display} />
=======
>>>>>>> dev
          <Route exact path="/about" component={About} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dash} />
          <Route exact path="/makeacct" component={MakeAcct} />
          <Route exact path="/videocall" component={VidCall} />
        </div>
      </BrowserRouter>
       </div>
    );
  }
}

export default App;

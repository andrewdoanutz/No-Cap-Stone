import React, { Component } from 'react';
import { BrowserRouter, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
//import Navbar from 'react-bootstrap/Navbar';

import NavBar from './components/navbar';
import Login from './pages/login';
import About from './pages/aboutUs'
import Dash from './pages/dashboard'
import MakeAcct from './pages/makeAcct'
import VidCall from './pages/videoCall'

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

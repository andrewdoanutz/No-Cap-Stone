import React, { Component } from 'react';
import { BrowserRouter, Route} from "react-router-dom";

import NavBar from './components/navbar'
import Login from './components/login.js'
import About from './components/aboutus'
import RTSA from './components/RTSA'
import Video from './components/Video'
import S2TP from './components/S2TP'
import S2TRT from './components/S2TRT'
import Display from './components/display'
import './css/App.css';

class App extends Component {

  render() {
    return (
      <div>
      <BrowserRouter>
        <div>
          <NavBar/>
          <Route exact path="/RTSA" component={RTSA} />
          <Route exact path="/Video" component={Video} />
          <Route exact path="/S2TP" component={S2TP} />
          <Route exact path="/S2TRT" component={S2TRT} />
          <Route exact path="/display" component={Display} />
          <Route exact path="/about" component={About} />
          <Route exact path="/login" component={Login} />
        </div>
      </BrowserRouter>
       </div>
    );
  }
}

export default App;

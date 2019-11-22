import React, { Component } from "react";
import Stopwatch from "../components/Stopwatch";
import Countdown from "../components/Countdown";

class Timer extends Component {
  render() {
    return (
      <div className="Timer">
        <h1 className="Timer-title">CLOCK</h1>
        <div className="Timers">
          <Stopwatch />
          <Countdown />
        </div>
      </div>
    );
  }
}

export default Timer;

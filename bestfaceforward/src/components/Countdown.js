import React, { Component } from "react";
import "../css/App.css";
import {Button} from 'react-bootstrap';

class Countdown extends Component {
  state = {
    timerOn: false,
    timerStart: 0,
    timerTime: 0
  };
  startTimer = () => {
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: this.state.timerTime
    });
    this.timer = setInterval(() => {
      const newTime = this.state.timerTime - 10;
      if (newTime >= 0) {
        this.setState({
          timerTime: newTime
        });
      } else {
        clearInterval(this.timer);
        this.setState({ timerOn: false });
        alert("Countdown ended");
      }
    }, 10);
  };
  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({ timerOn: false });
  };
  resetTimer = () => {
    if (this.state.timerOn === false) {
      this.setState({
        timerTime: this.state.timerStart
      });
    }
  };
  adjustTimer = input => {
    const { timerTime, timerOn } = this.state;
    const max = 216000000;
    if (!timerOn) {
      if (input === "incHours" && timerTime + 3600000 < max) {
        this.setState({ timerTime: timerTime + 3600000 });
      } else if (input === "decHours" && timerTime - 3600000 >= 0) {
        this.setState({ timerTime: timerTime - 3600000 });
      } else if (input === "incMinutes" && timerTime + 60000 < max) {
        this.setState({ timerTime: timerTime + 60000 });
      } else if (input === "decMinutes" && timerTime - 60000 >= 0) {
        this.setState({ timerTime: timerTime - 60000 });
      } else if (input === "incSeconds" && timerTime + 1000 < max) {
        this.setState({ timerTime: timerTime + 1000 });
      } else if (input === "decSeconds" && timerTime - 1000 >= 0) {
        this.setState({ timerTime: timerTime - 1000 });
      }
    }
  };
  render() {
    const { timerTime, timerStart, timerOn } = this.state;
    let seconds = ("0" + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2);
    let minutes = ("0" + Math.floor((timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor((timerTime / 3600000) % 60)).slice(-2);
    return (
      <div className="Countdown">
        <h1 className="Countdown-header">Timer</h1>
        <h1 className="Countdown-label">Hours : Minutes : Seconds</h1>
        <div className="Countdown-display">
          <Button size="lg" onClick={() => this.adjustTimer("incHours")}>&#8679;</Button>
          <Button size="lg" onClick={() => this.adjustTimer("incMinutes")}>&#8679;</Button>
          <Button size="lg" onClick={() => this.adjustTimer("incSeconds")}>&#8679;</Button>
          <h2 className="Countdown-time">
            {hours} : {minutes} : {seconds}
          </h2>
          <Button size="lg" onClick={() => this.adjustTimer("decHours")}>&#8681;</Button>
          <Button size="lg" onClick={() => this.adjustTimer("decMinutes")}>&#8681;</Button>
          <Button size="lg" onClick={() => this.adjustTimer("decSeconds")}>&#8681;</Button>
          {timerOn === false &&
          (timerStart === 0 || timerTime === timerStart) && (
            <Button size="lg" onClick={this.startTimer}>Start</Button>
          )}
        {timerOn === true && timerTime >= 1000 && (
          <Button size="lg" onClick={this.stopTimer}>Stop</Button>
          )}
        {timerOn === false &&
          (timerStart !== 0 && timerStart !== timerTime && timerTime !== 0) && (
             <Button size="lg" onClick={this.startTimer}>Resume</Button>
          )}
        {(timerOn === false || timerTime < 1000) &&
          (timerStart !== timerTime && timerStart > 0) && (
            <Button size="lg" onClick={this.resetTimer}>Reset</Button>
          )}

        </div>
      </div>
    );
  }
}

export default Countdown;

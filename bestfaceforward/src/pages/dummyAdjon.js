import React, { Component } from 'react'

export default class DummyAdjon extends Component {
  render() {
    return (
      <>
        {this.props.history.push({
        pathname: "/postAnalysis",
        state: { username: "Adjon Tahiraj"}
        })}
      </>
    )
  }
}

/* eslint camelcase: off, jsx-a11y/click-events-have-key-events: off */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default function Timing(props) {
  try {
    const results = props.messages.map(msg => msg.results.map((result, i) => (
      <div key={msg.result_index + i}>
        {result.alternatives[0].timestamps.map((times, j) => (
            <span key={`times-${msg.result_index +j}`}>
              <h1>Word: {times[0]} Start: {times[1]} End: {times[2]} </h1>
            </span>
          ))}
      </div>)))
    return (
      <div>
        {results}
      </div>
    )
      } catch (ex) {
        console.log(ex);
        console.log("props",props)
        return <div>{ex.message}</div>;
    }
}

Timing.propTypes = {
  messages: PropTypes.array.isRequired, // eslint-disable-line
};

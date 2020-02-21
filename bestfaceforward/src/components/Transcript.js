import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'
export default function Transcript(props) {
  try {
    // When resultsBySpeaker is enabled, each msg.results array may contain multiple results.
    // The result_index is for the first result in the message,
    // so we need to count up from there to calculate the key.
    const results = props.messages.map(msg => msg.results.map((result, i) => (
      <span key={`result-${msg.result_index + i}`}>{result.alternatives[0].transcript}</span>
    ))).reduce((a, b) => a.concat(b), []); // the reduce() call flattens the array

    // axios.post('http://localhost:3001/db/writeTranscript', {q:results[0].props.children, u:"practice"})
    // console.log("RESULTS",results)
    // console.log("RESULTS[0].props.children",results[0].props.children)

    return (
      <div>
        {results}
      </div>
    );
  } catch (ex) {
    console.log(ex);
    console.log("props",props)
    return <div>{ex.message}</div>;
  }
}

Transcript.propTypes = {
  messages: PropTypes.array.isRequired, // eslint-disable-line
};

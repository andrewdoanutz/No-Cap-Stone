import React, { Component } from 'react';
import {Button, Row, Col} from 'react-bootstrap';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,} from 'recharts';
import axios from 'axios';
//sentiment analysis
//To  disable CORS policy in chrome:
  // kill all instances of chrome
  //run on command line: "open -a Google\ Chrome --args --disable-web-security --user-data-dir"


class WAT extends Component{
  constructor(){
    super()
    this.results=""
  }

  Watson (){
    console.log("analyzing...")
    const ToneAnalyzerV3= require('ibm-watson/tone-analyzer/v3');
    const  {IamAuthenticator}  = require('ibm-watson/auth');


      const toneAnalyzer = new ToneAnalyzerV3({
        version: '2019-02-22',
        // username: 'apikey',
        // password: 'M0o5HbUt2oLKXBvYA2hpNeioDKY9AhLxkydJIt98vYh'
        authenticator: new IamAuthenticator({
          apikey: '16z3Ok_HxaBtLL2TKSsvquFxqVeiPUudpdkTY1TECdgr',
        }),
        url: 'https://gateway.watsonplatform.net/tone-analyzer/api',
      });

    const toneParams = {
      toneInput: { 'text': this.props.text },
      contentType: 'application/json',
    };

    toneAnalyzer.tone(toneParams)
      .then(toneAnalysis => {
       console.log(toneAnalysis.result.document_tone.tones);
       this.results=toneAnalysis.result.document_tone.tones;

      })
      .catch(err => {
        console.log('error:', err);
      })

  }


  render(){


    return(
      <div>
        <div>
            <Button onClick={this.Watson.bind(this)}>Analyze Transcript</Button>
            <div className = "centered">
              <BarChart width={730} height={300} data={this.results}>
                <XAxis dataKey="tone_name" />
                <YAxis/>
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="#8884d8" />
              </BarChart>
            </div>
        </div>

      </div>
    )
  }
}

export default WAT

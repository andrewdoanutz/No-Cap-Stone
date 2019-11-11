import React, { Component } from 'react';
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
       console.log(JSON.stringify(toneAnalysis, null, 2));
       this.results=JSON.stringify(toneAnalysis.result.document_tone.tones, null, 2)
      })
      .catch(err => {
        console.log('error:', err);
      })

  }
  render(){

    return(
      <div>
        <div>
            <button onClick={this.Watson.bind(this)}>Analyze Transcript</button>
            <div>{this.results}</div>
        </div>

      </div>
    )
  }
}

export default WAT

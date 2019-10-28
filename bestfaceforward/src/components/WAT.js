import React, { Component } from 'react';



class WAT extends Component{
  constructor(){
    super()
    this.results=""
    this.watson()
  }

  watson (){

    var tone;
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

    const text = 'Team, I know that times are tough! Product '
      + 'sales have been disappointing for the past three '
      + 'quarters. We have a competitive product, but we '
      + 'need to do a better job of selling it!';

    const toneParams = {
      toneInput: { 'text': text },
      contentType: 'application/json',
    };

    toneAnalyzer.tone(toneParams)
      .then(toneAnalysis => {

       //return(<h1>{toneAnalysis}</h1>);
       console.log(JSON.stringify(toneAnalysis, null, 2));
       this.results=JSON.stringify(toneAnalysis, null, 2)
      })
      .catch(err => {
        console.log('error:', err);
      })

  }
  render(){

    return(
      <div>
        <div>
          {this.results}
        </div>

      </div>
    )
  }
}

export default WAT

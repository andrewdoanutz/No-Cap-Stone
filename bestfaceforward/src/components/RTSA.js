//sentiment analysis
//To  disable CORS policy in chrome:
  // kill all instances of chrome
  //run on command line: "open -a Google\ Chrome --args --disable-web-security --user-data-dir"
import React, { Component } from 'react';
import WAT from './WAT';

export default class RTSA extends Component{

  render() {

    return (

      <div>

        <div>RTSA</div>
        <div>RTSA</div>
        <div>RTSA</div>
        <div>RTSA</div>
        <div>RTSA</div>
        <div>RTSA</div>
        <div>RTSA</div>
        <div>RTSA</div>
        <div>RTSA</div>
        <div>RTSA</div>
        <div>RTSA</div>
        <WAT/>

      </div>
    )
  }
}



//sentiment analysis
// import React, { Component } from 'react';
//
//
// var toned;
// export default class RTSA extends Component{
//   watson (){
//     const ToneAnalyzerV3= require('ibm-watson/tone-analyzer/v3');
//     const  {IamAuthenticator}  = require('ibm-watson/auth');
//
//     const toneAnalyzer = new ToneAnalyzerV3({
//       version: '2017-09-21',
//       authenticator: new IamAuthenticator({
//         apikey: '16z3Ok_HxaBtLL2TKSsvquFxqVeiPUudpdkTY1TECdgr',
//       }),
//       url: 'https://gateway.watsonplatform.net/tone-analyzer/api',
//     });
//
//     const text = 'Team, I know that times are tough! Product '
//       + 'sales have been disappointing for the past three '
//       + 'quarters. We have a competitive product, but we '
//       + 'need to do a better job of selling it!';
//
//     const toneParams = {
//       toneInput: { 'text': text },
//       contentType: 'application/json',
//     };
//     toned = toneAnalyzer.tone(toneParams)
//       .then(toneAnalysis => {
//        return( JSON.stringify(toneAnalysis, null, 2));
//       })
//       .catch(err => {
//         console.log('error:', err);
//       });
//   }
//
//   render() {
//
//     return (
//
//       <div>
//
//         <div>RTSA</div>
//         <div>RTSA</div>
//         <div>RTSA</div>
//         <div>RTSA</div>
//         <div>RTSA</div>
//         <div>RTSA</div>
//         <div>RTSA</div>
//         <div>RTSA</div>
//         <div>RTSA</div>
//         <div>RTSA</div>
//         <div>RTSA</div>
//         <button onClick = {this.watson} >Analyze</button>
//         <span>{toned}</span>
//       </div>
//     )
//   }
// }

//import React, { Component } from 'react';
import {ToneAnalyzer} from 'react-native-watson';

ToneAnalyzer.initialize("username", "password")

const text = 'Team, I know that times are tough! Product '
  + 'sales have been disappointing for the past three '
  + 'quarters. We have a competitive product, but we '
  + 'need to do a better job of selling it!';

ToneAnalyzer.getTone( text )
    .then( toneAnalysis => console.log(JSON.stringify(toneAnalysis) ))

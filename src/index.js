import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from 'firebase';
import PlayerControl from './PlayerControl.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "../node_modules/video-react/dist/video-react.css";
const firebaseConfig = {
  apiKey: "AIzaSyBsxrMsRiJAppnMX5uXUT5VtzvDFCXzjxA",
  authDomain: "baseball-ui.firebaseapp.com",
  databaseURL: "https://baseball-ui.firebaseio.com",
  projectId: "baseball-ui",
  storageBucket: "baseball-ui.appspot.com",
  messagingSenderId: "813689768638",
  appId: "1:813689768638:web:3d892777346f01fd8becef"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<PlayerControl />, document.getElementById('root'));
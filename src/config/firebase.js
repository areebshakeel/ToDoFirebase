import React from "react";
import firebase from "firebase/app";
// import { connect } from "react-firebase";

var firebaseConfig = {
  apiKey: "AIzaSyALOq7Sh2yRlaq2175SjLaxMkUBUab0L6M",
  authDomain: "todo-app-ee941.firebaseapp.com",
  databaseURL: "https://todo-app-ee941.firebaseio.com",
  projectId: "todo-app-ee941",
  storageBucket: "todo-app-ee941.appspot.com",
  messagingSenderId: "914597283937",
  appId: "1:914597283937:web:277b787d305350fe9c8220",
  measurementId: "G-NR727RYRCS",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default firebase;

// import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database'

const firebaseConfig = {
    apiKey: "AIzaSyC2rsbnDwyzQ9TzWawWSvBUxtZsV77RMuo",
    authDomain: "react-firebase-auth-53c1a.firebaseapp.com",
    projectId: "react-firebase-auth-53c1a",
    storageBucket: "react-firebase-auth-53c1a.appspot.com",
    messagingSenderId: "922758335770",
    appId: "1:922758335770:web:659a84f6d3805c1eb6f0a3"
};

const app = firebase.initializeApp(firebaseConfig);
export default app;
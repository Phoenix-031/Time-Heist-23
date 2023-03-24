// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
import {getFireStore} from "firebase/firestore";
import {getAuth} from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAI6iV13Oc5yhocGkq1evahYWNE_LA4M74",
  authDomain: "foodiez-2fb9e.firebaseapp.com",
  projectId: "foodiez-2fb9e",
  storageBucket: "foodiez-2fb9e.appspot.com",
  messagingSenderId: "185566992678",
  appId: "1:185566992678:web:36ad10282617d70e6049e7",
  measurementId: "G-V2D26EK6K2"
};

// Initialize Firebase

export const FIREBASE_APP = firebase.initializeApp(firebaseConfig);
export const FIREBASE_DB = getFireStore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
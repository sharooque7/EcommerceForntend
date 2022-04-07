// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxw6Zo-Fj1Vt5o1xvdH2HJwt1WKa_pL9k",
  authDomain: "ecommerce-e54f2.firebaseapp.com",
  projectId: "ecommerce-e54f2",
  storageBucket: "ecommerce-e54f2.appspot.com",
  messagingSenderId: "488925135630",
  appId: "1:488925135630:web:342475f278758712ce4d5f",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

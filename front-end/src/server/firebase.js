import firebase from "firebase";

import "firebase/auth";
import "firebase/storage";
import "firebase/database";

import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJU8JGt5I1Kf7p_OqDIEttsVJCwSxjOoY",
  authDomain: "slack-clone-ed1a9.firebaseapp.com",
  databaseURL: "https://slack-clone-ed1a9.firebaseio.com",
  projectId: "slack-clone-ed1a9",
  storageBucket: "slack-clone-ed1a9.appspot.com",
  messagingSenderId: "475067130230",
  appId: "1:475067130230:web:6975e4c90393cadc79da57",
  measurementId: "G-1PY3HXZKQD",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default firebase;

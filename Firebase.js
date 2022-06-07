import firebase from "firebase";
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDu-XeqEdf6sN2a9jCX4codelbRUK1S9go",
  authDomain: "uber-eats-350313.firebaseapp.com",
  projectId: "uber-eats-350313",
  storageBucket: "uber-eats-350313.appspot.com",
  messagingSenderId: "594541423933",
  appId: "1:594541423933:web:ebb9afe324a5ba6db0e954",
  measurementId: "G-RJQBTCXE46",
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default firebase;

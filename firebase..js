import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC54MXN7ELtIoXK65i6QFD91AAYl73gyRM",
    authDomain: "clone-63e34.firebaseapp.com",
    projectId: "clone-63e34",
    storageBucket: "clone-63e34.appspot.com",
    messagingSenderId: "465271266146",
    appId: "1:465271266146:web:8552caf7ca83b896972a3b",
    measurementId: "G-Z76T6EK24B"
  };

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();

export default db;
import firebase from 'firebase';

// Use your config values here.
firebase.initializeApp({
    apiKey: "AIzaSyAu3sspCxp-BA6z4p51ULUlujNlO75xKv8",
    authDomain: "searchwaldo.firebaseapp.com",
    databaseURL: "https://searchwaldo-default-rtdb.firebaseio.com",
    projectId: "searchwaldo",
    storageBucket: "searchwaldo.appspot.com",
    messagingSenderId: "840240869893",
    appId: "1:840240869893:web:21ae56cca12041c00be26c",
    measurementId: "G-Y2ZKZW3GWL"
  });

  console.log('initialize successful');

export default firebase;
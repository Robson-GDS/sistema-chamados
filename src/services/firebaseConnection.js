import firebase from 'firebase/app';
import 'firebase/auth';

let firebaseConfig = {
  apiKey: "AIzaSyCIRQZs9D64XV9yChYxIPFRl4IIRzHFDjM",
  authDomain: "sistema-chamados-699f3.firebaseapp.com",
  projectId: "sistema-chamados-699f3",
  storageBucket: "sistema-chamados-699f3.appspot.com",
  messagingSenderId: "976970061254",
  appId: "1:976970061254:web:fad2b6fe7ea64acb3dcec7",
  measurementId: "G-DG771NVD1S"
};

if(!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;

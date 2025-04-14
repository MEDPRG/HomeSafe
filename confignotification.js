import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "XXXXXXXXXXXXXXX-XXXXXXXXXX-XXXXXXXX",
  authDomain: "xxxx-xxxx-xxxx.firebaseapp.com",
  projectId: "xxxx-xxxx-xxxx",
  storageBucket: "xxxx-xxxx-xxxx.appspot.com",
  messagingSenderId: "543467678755",
  appId: "1:543467678755:web:ebc51396735c7de3da5596",
  measurementId: "G-5T04TJTEYX",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };

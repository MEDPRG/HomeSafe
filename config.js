import firebase from "firebase/compat/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "XXXXXXXXXXXXXX-XXXXXXXXXXXXXXX-XXXXXXXXXXXXXX",
  authDomain: "home-safe-data.firebaseapp.com",
  projectId: "home-safe-data",
  storageBucket: "home-safe-data.appspot.com",
  messagingSenderId: "543467678755",
  appId: "1:543467678755:web:ebc51396735c7de3da5596",
  measurementId: "G-5T04TJTEYX",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const db = getDatabase();

export { db };

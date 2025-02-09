import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2gLpcj-kFSO3iTD0Bgwk7H3OVHNPxWyM",
  authDomain: "daring-reducer-322111.firebaseapp.com",
  databaseURL: "https://daring-reducer-322111-default-rtdb.firebaseio.com",
  projectId: "daring-reducer-322111",
  storageBucket: "daring-reducer-322111.appspot.com",
  messagingSenderId: "72615862897",
  appId: "1:72615862897:web:b274b64b59fdd13644b1d0",
  measurementId: "G-FSLR1SZMH6",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };

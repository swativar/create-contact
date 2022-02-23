// Import the functions you need from the SDKs you need
import { initializeApp , getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

//import firebase from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaShe5U2ihZ2ZQD2aVNQas--fiknrLlMI",
  authDomain: "create-contact-19daf.firebaseapp.com",
  projectId: "create-contact-19daf",
  storageBucket: "create-contact-19daf.appspot.com",
  messagingSenderId: "850123585062",
  appId: "1:850123585062:web:95d0104afe3b3135da98e7",
  measurementId: "G-HEVD8TN1C9"
};

// Initialize Firebase

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps();
//const storage = firebase.storage()
const analytics = getAnalytics(app);
const storage = getStorage(app);

export  {
   storage, app
 }
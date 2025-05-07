// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_5KD6QmLUIOGDq4UiN5Ljvyes9WS1HdA",
  authDomain: "fir-practise-1d048.firebaseapp.com",
  projectId: "fir-practise-1d048",
  storageBucket: "fir-practise-1d048.firebasestorage.app",
  messagingSenderId: "400784086419",
  appId: "1:400784086419:web:075e874d22c9d0a94dc466",
  measurementId: "G-1V452B1N5M"
};






// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export const db = getFirestore();


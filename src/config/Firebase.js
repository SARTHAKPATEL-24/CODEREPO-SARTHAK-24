
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAto67NbMYXkzOiFkKJKRYit3XRQPpJncs",
  authDomain: "glidego-2beb2.firebaseapp.com",
  projectId: "glidego-2beb2",
  storageBucket: "glidego-2beb2.firebasestorage.app",
  messagingSenderId: "63687308155",
  appId: "1:63687308155:web:048ad28fe663c5870703de",
  measurementId: "G-TWMRNP5C2S"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
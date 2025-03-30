// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB7Q4TfM8jGyRRZccJLVq96lMAdmqou594",
    authDomain: "safetrail-7604d.firebaseapp.com",
    projectId: "safetrail-7604d",
    storageBucket: "safetrail-7604d.firebasestorage.app",
    messagingSenderId: "337062623357",
    appId: "1:337062623357:web:0eb6d5b4410cf1b39a9914",
    measurementId: "G-H9VL505VVN"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

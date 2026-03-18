// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1Qf_Up48jPJ5gB8cn5RXg-Dbgjw0Cbic",
  authDomain: "fp-cameroon.firebaseapp.com",
  projectId: "fp-cameroon",
  storageBucket: "fp-cameroon.firebasestorage.app",
  messagingSenderId: "377846029241",
  appId: "1:377846029241:web:0738300974105194ac3468",
  measurementId: "G-T70LF3XLWM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
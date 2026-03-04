// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBifS32TI5MN5B9VB02LFboEtzDWcrNuyA",
  authDomain: "silent-shield.firebaseapp.com",
  databaseURL: "https://silent-shield-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "silent-shield",
  storageBucket: "silent-shield.firebasestorage.app",
  messagingSenderId: "37251981810",
  appId: "1:37251981810:web:5a4cc947cb9eb8fc4fcb6b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
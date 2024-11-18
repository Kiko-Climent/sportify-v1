// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "sportify-v1.firebaseapp.com",
  projectId: "sportify-v1",
  storageBucket: "sportify-v1.firebasestorage.app",
  messagingSenderId: "378263987104",
  appId: "1:378263987104:web:5439d4358a156866f93ac5",
  measurementId: "G-VTJ2BMD446"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
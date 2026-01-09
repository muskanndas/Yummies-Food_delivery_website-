// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/APIsetup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "yummies-510e5.firebaseapp.com",
  projectId: "yummies-510e5",
  storageBucket: "yummies-510e5.firebasestorage.app",
  messagingSenderId: "137885626730",
  appId: "1:137885626730:web:8cbc98544093615bcf3513"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export{app,auth};
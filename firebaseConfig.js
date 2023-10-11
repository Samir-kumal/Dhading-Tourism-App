// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2u-XNijJS9S3mKYKTgE9rlj-ZbfP2_wA",
  authDomain: "bms-dhading-app.firebaseapp.com",
  projectId: "bms-dhading-app",
  storageBucket: "bms-dhading-app.appspot.com",
  messagingSenderId: "586640181213",
  appId: "1:586640181213:web:f40a3c79396c11dc639834",
  measurementId: "G-SFEF52V5NN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBDRXHDumgbSR5MXcaxHwppbJDRePzlAiw",
  authDomain: "next-sewa-panauti-app.firebaseapp.com",
  projectId: "next-sewa-panauti-app",
  storageBucket: "next-sewa-panauti-app.appspot.com",
  messagingSenderId: "973021055122",
  appId: "1:973021055122:web:c1605322f683b78bb47e4b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

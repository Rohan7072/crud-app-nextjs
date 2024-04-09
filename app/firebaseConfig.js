import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCATPpgE1Pe3d9Y4kuAynKTJwWVmt9kGBg",
  authDomain: "crud-app-3bdce.firebaseapp.com",
  projectId: "crud-app-3bdce",
  storageBucket: "crud-app-3bdce.appspot.com",
  messagingSenderId: "440058810169",
  appId: "1:440058810169:web:559f7d4506147b75e0a2e8",
  measurementId: "G-DWKCHVMLZQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};
// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyC37ZWIDqnOse90GwhOcFovexZHxLdx_DY",
  authDomain: "digger-37607.firebaseapp.com",
  projectId: "digger-37607",
  storageBucket: "digger-37607.appspot.com",
  messagingSenderId: "318980103867",
  appId: "1:318980103867:web:ee87f15e4e5a9b402c939e",
  measurementId: "G-EKYGP9T9WX"
};

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Export the Firebase Auth instance
export const auth = getAuth(firebaseApp);
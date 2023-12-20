// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optionalclear
const firebaseConfig = {
    apiKey: "AIzaSyD2MGfcdmaajj7d6tTjMY6dZ1XYX9BK_Ks",
    authDomain: "expense11-b696d.firebaseapp.com",
    projectId: "expense11-b696d",
    storageBucket: "expense11-b696d.appspot.com",
    messagingSenderId: "283858908276",
    appId: "1:283858908276:web:fbad09c3aa1b87afe58d21",
    measurementId: "G-DGYD8EK4QZ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth(app);
export const provider =new GoogleAuthProvider();
export const db=getFirestore(app);
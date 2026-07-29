// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import dotenv from "dotenv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-estate-c6a04.firebaseapp.com",
    projectId: "mern-estate-c6a04",
    storageBucket: "mern-estate-c6a04.firebasestorage.app",
    messagingSenderId: "73862518030",
    appId: "1:73862518030:web:26f5c0096431eaea3b335f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
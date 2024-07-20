// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC-KgZAzycZwh2VR3sazhbRXT6Eio0hj9A",
    authDomain: "in-and-out-bda1f.firebaseapp.com",
    projectId: "in-and-out-bda1f",
    storageBucket: "in-and-out-bda1f.appspot.com",
    messagingSenderId: "127650798893",
    appId: "1:127650798893:web:6cd63d53c033fee98447a4",
    measurementId: "G-0M10P3TZQR"
  };

// Initialize Firebase
let firebaseApp;


// singleton
if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
} else {
    firebaseApp = getApps()[0];
}
// const analytics = getAnalytics(firebaseApp);
// // Initialize Firestore
// const db = getFirestore(firebaseApp);

// Export both firebaseApp and Firestore db instance
export default firebaseApp;

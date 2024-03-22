import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCN5TIu0o3pqGSg1nH652LTtAgRp5rGX7Q",
  authDomain: "the-king-burger.firebaseapp.com",
  projectId: "the-king-burger",
  storageBucket: "the-king-burger.appspot.com",
  messagingSenderId: "65448844500",
  appId: "1:65448844500:web:1fb0ec0c78ce66c91eaf41",
  measurementId: "G-2JWK6ES6HD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
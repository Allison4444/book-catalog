import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAo6EihvXZrLNzP8kQSS9h3kQLOK8urZKk",
  authDomain: "book-catalog-f3710.firebaseapp.com",
  projectId: "book-catalog-f3710",
  storageBucket: "book-catalog-f3710.appspot.com",
  messagingSenderId: "1009281170231",
  appId: "1:1009281170231:web:4bc46b2ae27f025d1d38b2",
  measurementId: "G-4F9W55Z7W8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;

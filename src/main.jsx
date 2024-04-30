import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzavfm3Ne-LCbcSttBRdnLSjv8pHn27Lw",
  authDomain: "db-ecommerce-itp.firebaseapp.com",
  projectId: "db-ecommerce-itp",
  storageBucket: "db-ecommerce-itp.appspot.com",
  messagingSenderId: "670501599447",
  appId: "1:670501599447:web:b42067deb20b0980fe5892"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

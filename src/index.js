import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { initializeApp } from 'firebase/app';
import { getFunctions } from 'firebase/functions';

export const app = initializeApp({
  projectId: process.env.REACT_APP_PROJECT_ID,
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  appId: process.env.REACT_APP_APP_ID,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  });

export const functions = getFunctions(app);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

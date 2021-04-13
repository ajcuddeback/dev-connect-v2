<<<<<<< HEAD
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
=======
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from "./serviceWorker";
import reportWebVitals from './reportWebVitals';
>>>>>>> 57bcfd4a8d889a48e0915797b42bbf7e4d7c1db3

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

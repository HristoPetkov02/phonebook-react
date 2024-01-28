import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  //Когато е активен strictMode alert-товете се появяват 2 пъти 
  //<React.StrictMode>
    <App />
 // </React.StrictMode>
);

//import logo from './logo.svg';
//import './App.css';
import React, { useState } from 'react';

import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';

import Login from './pages/forAccounts/Login';
import Accounts from './pages/forAccounts/Accounts';
import AccountDetails from './pages/forAccounts/AccountDetails';
import AccountManagment from './pages/forAccounts/AccountManagement';
import Register from './pages/forAccounts/Register';

import FacultyList from './pages/faculties/FacultyList';
import UpdateFaculty from './pages/faculties/UpdateFaculty';
import AddFaculty from './pages/faculties/AddFaculty';

import Home from './pages/Home';


export default function App() {
  return (
    <Router>
      <Routes >
        <Route exact path="/" element={<Home/>} />

        <Route exact path="/account/register" element={<Register/>} />
        <Route exact path="/account/login" element={<Login/>} />
        <Route exact path="/account/all" element={<Accounts/>} />
        <Route exact path="/account/details" element={<AccountDetails/>} />
        <Route exact path="/account/managment" element={<AccountManagment/>} />

        <Route exact path="/faculty/list" element={<FacultyList/>} />
        <Route exact path="/faculty/update/:id" element={<UpdateFaculty/>} />
        <Route exact path="/faculty/add" element={<AddFaculty/>} />
      </Routes>
    </Router>
  );
}

function LogIn({ handlePostRequest }) {
  const handleClick = () => {
    handlePostRequest();
  };

  return (
    <button onClick={handleClick}>Log In</button>
  );
}



//export default App;

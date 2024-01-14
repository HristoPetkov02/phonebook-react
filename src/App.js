//import logo from './logo.svg';
//import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CustomLoginPage from './components/CustomLoginPage';
import AccountList from './components/AccountList';
import axios from 'axios';

export default function App() {
  return (
    <Router>
        <Switch>
          <Route path="/login" component={CustomLoginPage} />
          <Route path="/account/all" component={AccountList} />
        </Switch>
    </Router>
    
  );
 /* const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState(null);

  const handlePostRequest = async () => {
    try {
      const response = await axios.post('http://localhost:8081/logIn', {
        username: username,
        password: password,
      });

      setResult(response.data);
    } catch (error) {
      console.error('Error making POST request:', error);
    }
  };

  return (
    <div>
      <h1>Welcome to my app</h1>
      <br />
      <label>Username</label>
      <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
      <br />
      <label>Password</label>
      <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <LogIn handlePostRequest={handlePostRequest} />

      {result && (
        <div>
          <h2>Response:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );*/
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

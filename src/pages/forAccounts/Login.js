import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8081/user/auth', {
        username: username,
        password: password,
      });
  

      const jwtToken = response.data.token;
  
      localStorage.setItem('jwtToken', jwtToken);
      
      alert('Login successful!');
  
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert('Bad credentials');
      } else {
        console.error('Login failed:', error.message);
      }
    }
  };

  const isButtonDisabled = () => {
    // ще върне true, ако има празно поле
    return username === '' || password === '';
  };
  

  return (
    <div>
      <h2>Login</h2>
      <form>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleLogin}
          disabled={isButtonDisabled()}
          title={isButtonDisabled() ? "All fields are required" : ""}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
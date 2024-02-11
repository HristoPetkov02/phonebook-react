import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8081/user/register', {
        username: username,
        email: email,
        password: password,
      });

      const jwtToken = response.data.token;
  
      localStorage.setItem('jwtToken', jwtToken);

      alert('Registration successful!');
    } catch (error) {
      console.error('Registration failed:', error.message);

      if (error.response && error.response.status === 404) {
        alert('Registration failed. The username is taken.');
      } else {
        alert('Registration failed. Please try again later.');
      }
    }
  };

  const isButtonDisabled = () => {
    // ще върне true, ако има празно поле
    return username === '' || email === '' || password === '';
  };

  return (
    <div>
      <h2>Register</h2>
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleRegister}
          disabled={isButtonDisabled()}
          title={isButtonDisabled() ? "All fields are required" : ""}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';


const Accounts = () => {
    //setAccounts функцията която ще запълне array-а
    //в версия 16.8 са добавили Hooks позволяващи да ползваме 
    //useState без да се пишат класове
  const [accounts, setAccounts] = useState([]);
  const navigate = useNavigate();
  
  
  //ще бъде изпълнено когато се зареди компонента (в случая този компонент е страницата ми)
  useEffect(() => {
    // Взимане на токена
    const jwtToken = localStorage.getItem('jwtToken');
    

    if (jwtToken) {
      axios.get('http://localhost:8081/user/all', {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then(response => {
        setAccounts(response.data);
      })
      .catch(error => {
        if (error.response) {
            
            const statusCode = error.response.status;
    
            if (statusCode === 500) {
              alert("Session expired. Please log in again.\nYou will be redirected automaticaly");
              navigate('/account/login');
            } else if (statusCode === 403) {
              alert("You don't have the authority to view this information. Returning to home page.");
              navigate('/account/login');
            } else {
              console.error('Error fetching accounts:', error.message);
            }
          } else if (error.request) {
            console.error('No response received:', error.message);
          } else {
            console.error('Error setting up the request:', error.message);
          }
        });
    }
  }, [navigate]); 

  return (
    <div>
      <h2>Accounts</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map(account => (
            <tr key={account.id_user}>
              <td>{account.id_user}</td>
              <td>{account.username}</td>
              <td>{account.email}</td>
              <td>{account.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Accounts;
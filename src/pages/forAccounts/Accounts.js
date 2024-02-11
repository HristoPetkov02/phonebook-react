import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import handleApiError from '../../utils/handleApiError';


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
        handleApiError(error, navigate);
      });
    }
  }, [navigate]); //navigate е добавен като зависимост, за да може да се използва в catch блока

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
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';

const AccountManagement = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get('http://localhost:8081/user/all', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          },
        });

        setAccounts(response.data);
      } catch (error) {
        handleApiError(error);
      }
    };

    fetchAccounts();
  }, []);

  const handleApiError = (error) => {
    if (error.response) {
      const statusCode = error.response.status;

      if (statusCode === 500) {
        alert('Session expired. Please log in again.\nYou will be redirected automatically');
        navigate('/account/login');
      } else if (statusCode === 403) {
        alert("You don't have the authority to view this information. Returning to home page.");
        navigate('/account/login');
      } else {
        console.error('API request failed with status code:', statusCode);
      }
    } else {
      console.error('API request failed:', error.message);
    }
  };

  const handleGrantAuthority = async () => {
    try {
        console.error( selectedAccount );
      const response = await axios.post(
        'http://localhost:8081/user/grantAuthority',
        { username: selectedAccount },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          },
        }
      );
  
      alert(`Granted authority to ${selectedAccount}.`);
    } catch (error) {
      handleApiError(error);
    }
  };
  
  const handleRevokeAuthority = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8081/user/revokeAuthority',
        { username: selectedAccount },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          },
        }
      );
  
      alert(`Revoked authority from ${selectedAccount}.`);
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <div>
        <h2>Account Management</h2>
        <select value={selectedAccount} onChange={(e) => setSelectedAccount(e.target.value)}>
            <option value="">Select an account</option>
            {accounts.map((account) => (
                <option key={account.username} value={account.username}>
                {account.username}
                </option>
            ))}
        </select>
      <br />
      <button type="button" onClick={handleGrantAuthority}>
        Grant Authority
      </button>
      <button type="button" onClick={handleRevokeAuthority}>
        Revoke Authority
      </button>
    </div>
  );
};

export default AccountManagement;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import handleApiError from '../../utils/handleApiError';

const AccountDetails = () => {
  const [details, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/user/single', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          },
        });

        setUserDetails(response.data);
      } catch (error) {
        handleApiError(error, navigate);
      }
    };

    fetchData();
  }, []);

    return (
        <div>
            {details ? (
                <div>
                    <h1>User Details</h1>
                    <p>Username: {details.username}</p>
                    <p>Email: {details.email}</p>
                    <p>role: {details.role}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default AccountDetails;
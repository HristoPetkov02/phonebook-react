import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import handleApiError from '../../utils/handleApiError';
import '../../css/Table.css';


const FacultyList = () => {
  const [faculties, setFaculties] = useState([]);
  const navigate = useNavigate();
  // използва се за проверка дали потребителят е администратор
  // atob декодира jwt токена и взима втората част от него, която съдържа информация за потребителя
  // първо се проверява дали jwt токена съществува, за да не се възникне грешка
  const isAdmin = localStorage.getItem('jwtToken') ? JSON.parse(atob(localStorage.getItem('jwtToken').split('.')[1])).role === 'ADMIN' : false;

  useEffect(() => {
    // извиква се endpoint-а за взимане на всички факултети
    axios.get('http://localhost:8081/faculties/all',
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
    })
      .then(response => setFaculties(response.data))
      .catch(error => handleApiError(error, navigate));
        //console.error('Error fetching faculties:', error));
  }, []); //[] означава, че този useEffect ще се изпълни само веднъж, когато се зареди компонента

  const handleUpdate = (id) => {
    // пренасочва към страницата за редактиране на факултета като подава id-то на факултета
    navigate(`/faculty/update/${id}`);
  };

  const handleDelete = (id) => {
    // извиква се endpoint-а за изтриване на факултета
    axios.delete(`http://localhost:8081/faculties/${id}/delete`,
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
    })
      .then(response => {
        // отново извежда списъка с факултетите, но без изтрития
        setFaculties(prevFaculties => prevFaculties.filter(faculty => faculty.id !== id));
        alert('Faculty deleted successfully!');
      })
      .catch(error => handleApiError(error, navigate));
        //console.error('Error deleting faculty:', error));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Faculty Code</th>
          <th>Faculty Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {faculties.map(faculty => (
          <tr key={faculty.id}>
            <td>{faculty.id}</td>
            <td>{faculty.facultyCode}</td>
            <td>{faculty.facultyName}</td>
            <td>
              <button
                onClick={() => handleUpdate(faculty.id)}
                disabled={!isAdmin}
                title={!isAdmin ? "You don't have authority to update" : ""}
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(faculty.id)}
                disabled={!isAdmin}
                title={!isAdmin ? "You don't have authority to delete" : ""}
              >
                 Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FacultyList;
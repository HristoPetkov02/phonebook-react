import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';


const FacultyList = () => {
  const [faculties, setFaculties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8081/faculties/all',
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
    })
      .then(response => setFaculties(response.data))
      .catch(error => console.error('Error fetching faculties:', error));
  }, []);

  const handleUpdate = (id) => {
    // пренасочва към страницата за редактиране на факултета като подава id-то на факултета
    navigate(`/faculty/update/${id}`);
  };

  const handleDelete = (id) => {
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
      .catch(error => console.error('Error deleting faculty:', error));
  };

  return (
    <table border="1">
      <thead>
        <tr>
          <th>Faculty Code</th>
          <th>Faculty Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {faculties.map(faculty => (
          <tr key={faculty.id}>
            <td>{faculty.facultyCode}</td>
            <td>{faculty.facultyName}</td>
            <td>
              <button onClick={() => handleUpdate(faculty.id)}>Update</button>
              <button onClick={() => handleDelete(faculty.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FacultyList;
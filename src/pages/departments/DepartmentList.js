import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import handleApiError from '../../utils/handleApiError';
import '../../css/Table.css';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();
  //взима се ролята на потребителя от jwt токена
  const isAdmin = localStorage.getItem('jwtToken') ? JSON.parse(atob(localStorage.getItem('jwtToken').split('.')[1])).role === 'ADMIN' : false;

  useEffect(() => {
    // извиква се endpoint-а за взимане на всички катедри (департаменти)
    axios.get('http://localhost:8081/departments/all', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      },
    })
      .then(response => setDepartments(response.data))
      .catch(error => handleApiError(error, navigate));
  }, []);//[] означава, че този useEffect ще се изпълни само веднъж, когато се зареди компонента

  const handleUpdate = (id) => {
    // пренасочва към страницата за редактиране на катедри (департаменти) като подава id-то на катедри (департаменти)
    navigate(`/department/update/${id}`);
  };

  const handleDelete = (id) => {
    // извиква се endpoint-а за изтриване на катедри (департаменти)
    axios.delete(`http://localhost:8081/departments/${id}/delete`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      },
    })
      .then(response => {
        // отново извежда списъка с катедри (департаменти), но без изтрития
        setDepartments(prevDepartments => prevDepartments.filter(department => department.id !== id));
        alert('Department deleted successfully!');
      })
      .catch(error => handleApiError(error, navigate));
  };
//ако има факултет, извежда името му, ако няма - извежда съобщение
  return (
    <table >
      <thead>
        <tr>
          <th>Id</th>
          <th>Department Code</th>
          <th>Department Name</th>
          <th>Faculty</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {departments.map(department => (
          <tr key={department.id}>
            <td>{department.id}</td>
            <td>{department.departmentCode}</td>
            <td>{department.departmentName}</td>
            
            <td>{department.faculty ? department.faculty.facultyName : 'No Faculty yet'}</td>

            <td>
            <button
                onClick={() => handleUpdate(department.id)}
                disabled={!isAdmin}
                title={!isAdmin ? "You don't have authority to update" : ""}
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(department.id)}
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

export default DepartmentList;
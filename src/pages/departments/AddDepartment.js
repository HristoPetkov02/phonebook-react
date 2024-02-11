import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import handleApiError from '../../utils/handleApiError';

const AddDepartment = () => {
  const [departmentData, setDepartmentData] = useState({
    departmentCode: '',
    departmentName: '',
    facultyId: '', // тук се пази id-то на факултета
  });
  const navigate = useNavigate();

  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    // използва се endpoint-а за взимане на всички факултети
    axios.get('http://localhost:8081/faculties/all', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      },
    })
      .then(response => setFaculties(response.data))
      .catch(error =>handleApiError(error, navigate));
  }, []);//[] означава, че този useEffect ще се изпълни само веднъж, когато се зареди компонента

  const handleInputChange = (e) => {
    setDepartmentData({
      ...departmentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNormalInsert = () => {
    // създава се обект с данните за катедрата (департамента)
    const requestData = {
      departmentCode: departmentData.departmentCode,
      departmentName: departmentData.departmentName,
      faculty: {
        id: departmentData.facultyId,
      },
    };

    // използва се endpoint-а за вмъкване на катедра (департамент)
    axios.post('http://localhost:8081/departments/add', requestData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      },
    })
      .then(response => {
        alert("Department added successfully!");
      })
      .catch(error => {
        alert("Error adding department!");
        handleApiError(error, navigate);
      });
  };

  const handleExcelInsert = (e) => {
    // използва се endpoint-а за вмъкване на катедри (департаменти) от Excel
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      axios.post('http://localhost:8081/departments/add/excel', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
      })
        .then(response => {
          alert("Departments added successfully!");
        })
        .catch(error => {
          alert("Error adding departments!");
          handleApiError(error, navigate);
        });
    }
  };

  const isButtonDisabled = () => {
    // ще върне true, ако има празно поле
    return departmentData.departmentCode === '' || departmentData.departmentName === '' || departmentData.facultyId === '';
  };

  return (
    <div>
      <h1>Add Department</h1>
      <form>
        <label>
          Department Code:
          <input type="text" name="departmentCode" value={departmentData.departmentCode} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Department Name:
          <input type="text" name="departmentName" value={departmentData.departmentName} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Faculty:
          <select name="facultyId" value={departmentData.facultyId} onChange={handleInputChange}>
            <option value="">Select Faculty</option>
            {faculties.map(faculty => (
              <option key={faculty.id} value={faculty.id}>{faculty.facultyName}</option>
            ))}
          </select>
        </label>
        <br />
        {/*ако няма сграда, бутона е disabled*/}
        <button type="button" onClick={handleNormalInsert}
          disabled={isButtonDisabled()} 
          title={isButtonDisabled() ? "All fields are required" : ""}
        >Insert Department</button>
        <br />
        <label>
          Upload Excel File:
          <input type="file" accept=".xls, .xlsx" onChange={handleExcelInsert} />
        </label>
      </form>
    </div>
  );
};

export default AddDepartment;

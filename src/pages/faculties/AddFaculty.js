import React, { useState } from 'react';
import axios from 'axios';

const AddFaculty = () => {
  const [facultyData, setFacultyData] = useState({
    facultyCode: '',
    facultyName: '',
  });

  const handleInputChange = (e) => {
    setFacultyData({
      ...facultyData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNormalInsert = () => {
    // използва се endpoint-а за вмъкване на факултет
    axios.post('http://localhost:8081/faculties/add', facultyData,
    {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
    })
      .then(response => {
        alert("Faculty added successfully!");

      })
      .catch(error => {
        alert("Error adding faculty!");
        console.error('Error updating faculty:', error);
      });
  };

  const handleExcelInsert = (e) => {
    // използва се endpoint-а за вмъкване на факултети от Excel
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      axios.post('http://localhost:8081/faculties/add/excel', formData,
      {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
    })
        .then(response => {
          alert("Faculties added successfully!");
        })
        .catch(error => {
          console.error('Error updating faculty:', error);
          alert("Error adding faculties!");
        });
    }
  };

  return (
    <div>
      <h1>Add Faculty</h1>
      <form>
        <label>
          Faculty Code:
          <input type="text" name="facultyCode" value={facultyData.facultyCode} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Faculty Name:
          <input type="text" name="facultyName" value={facultyData.facultyName} onChange={handleInputChange} />
        </label>
        <br />
        <button type="button" onClick={handleNormalInsert}>Insert Faculty</button>
        <br />
        <label>
          Upload Excel File:
          <input type="file" accept=".xls, .xlsx" onChange={handleExcelInsert} />
        </label>
      </form>
    </div>
  );
};

export default AddFaculty;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import handleApiError from '../../utils/handleApiError';

const AddFaculty = () => {
  const [facultyData, setFacultyData] = useState({
    facultyCode: '',
    facultyName: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFacultyData({
      // това се нарича "spread" оператор и я ползваме, за да променим само променените полета
      // в този случай, ако имаме facultyData = {facultyCode: '123', facultyName: 'Faculty 1'}
      // и извикаме setFacultyData({facultyCode: '1234'}), ще получим facultyData = {facultyCode: '1234', facultyName: 'Faculty 1'}
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
        handleApiError(error, navigate);
        //console.error('Error adding faculty:', error);
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
          //console.error('Error adding faculty:', error);
          alert("Error adding faculties!");
          handleApiError(error, navigate);
        });
    }
  };

  const isButtonDisabled = () => {
    // ще върне true, ако има празно поле
    return facultyData.facultyCode === '' || facultyData.facultyName === '';
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
        <button type="button" onClick={handleNormalInsert}
          disabled={isButtonDisabled()}
          title = {isButtonDisabled() ? "All fields are required" : ""}
        >Insert Faculty</button>
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
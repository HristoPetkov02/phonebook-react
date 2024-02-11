import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import handleApiError from '../../utils/handleApiError';

const UpdateDepartment = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [departmentData, setDepartmentData] = useState({
    departmentCode: '',
    departmentName: '',
    facultyId: '',  // тук се пази id-то на факултета
  });

  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    // използва се async функция, за да се изчака зареждането на данните
    // async e асинхронна функция
    // await изчаква да се получи отговор от еndpoint-а
    // това позволява да се запишат данните и да се изобразяват във form за редактиране
    // ако не се ползва асинхронна функция с await, не всички данни ще се заредят
    const fetchData = async () => {
      try {
        const departmentResponse = await axios.get(`http://localhost:8081/departments/${id}/find`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          },
        });
        // запазва се катедрата (департамента)
        const department = departmentResponse.data;

        // чрез spread оператора се запазват старите данни и се добавят новите
        setDepartmentData(prevDepartmentData => ({
          ...prevDepartmentData,
          departmentCode: department.departmentCode,
          departmentName: department.departmentName,
          // ако има ново id на факултета, то се запазва, иначе се запазва старото
          facultyId: prevDepartmentData.facultyId || department.faculty.id,
        }));
        // взима всички факултети
        const facultiesResponse = await axios.get('http://localhost:8081/faculties/all', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
          },
        });

        setFaculties(facultiesResponse.data);
      } catch (error) {
        handleApiError(error, navigate);
      }
    };
//извиква се функцията fetchData
    fetchData();
  }, [id, navigate]); // [id, navigate] са добавени като зависимости

  const handleChange = (e) => {
    // чрез spread оператора се запазват старите данни и се добавят новите
    setDepartmentData({ ...departmentData, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    // e.preventDefault() предотвратява презареждането на страницата
    e.preventDefault();
    // създава се обект с новите данни за катедрата (департамента)
    const requestData = {
      departmentCode: departmentData.departmentCode,
      departmentName: departmentData.departmentName,
      faculty: {
        id: departmentData.facultyId,
      },
    };

    // използва се endpoint-а за редактиране на катедра (департамент)
    axios.put(`http://localhost:8081/departments/${id}/update`, requestData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
      },
    })
      .then(response => {
        alert("Department updated successfully!");
      })
      .catch(error => {
        alert("Error updating department!");
        handleApiError(error, navigate);
      });
  };

  const isButtonDisabled = () => {
    // ще върне true, ако има празно поле
    return departmentData.departmentCode === '' || departmentData.departmentName === '' || departmentData.facultyId === '';
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Department Code</label>
        <input type='text' name='departmentCode' value={departmentData.departmentCode} onChange={handleChange} />
      </div>
      <div>
        <label>Department Name</label>
        <input type='text' name='departmentName' value={departmentData.departmentName} onChange={handleChange} />
      </div>
      <div>
        <label>Faculty</label>
        <select name='facultyId' value={departmentData.facultyId} onChange={handleChange}>
          <option value=''>Select Faculty</option>
          {faculties.map(faculty => (
            <option key={faculty.id} value={faculty.id}>{faculty.facultyName}</option>
          ))}
        </select>
      </div>
      <button type='submit' 
        disabled={isButtonDisabled()}
        title={isButtonDisabled() ? "All fields are required" : ""}
      >
        Update Department
        </button>
    </form>
  );
};

export default UpdateDepartment;


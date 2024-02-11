import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import handleApiError from '../../utils/handleApiError';

const AddStudent = () => {
    const [studentData, setStudentData] = useState({
        firstName: '',
        lastName: '',
        FN: '',
        departmentId: '',
        collegeId: '',
        roomId: '',
    });
    const navigate = useNavigate();

    const [departments, setDepartments] = useState([]);
    const [colleges, setColleges] = useState([]);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        // използва се endpoint-а за взимане на всички катедри
        axios.get('http://localhost:8081/departments/all', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
            },
        })
            .then(response => setDepartments(response.data))
            .catch(error => handleApiError(error, navigate));
    }, []);//[] означава, че този useEffect ще се изпълни само веднъж, когато се зареди компонента

    const handleInputChange = (e) => {
        setStudentData({
            ...studentData,
            [e.target.name]: e.target.value,
        });
    };

    const handleNormalInsert = () => {
        // създава се обект с данните за студента
        const requestData = {
            firstName: studentData.firstName,
            lastName: studentData.lastName,
            FN: studentData.FN,
            department: {
                id: studentData.departmentId,
            },
            college: {
                id: studentData.collegeId,
            },
            room: {
                id: studentData.roomId,
            },
        };

        // използва се endpoint-а за вмъкване на студент
        axios.post('http://localhost:8081/students/add', requestData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
            },
        })
            .then(response => {
                alert("Student added successfully!");
            })
            .catch(error => {
                alert("Error adding student!");
                handleApiError(error, navigate);
            });
    };

    const handleExcelInsert = (e) => {
        // използва се endpoint-а за вмъкване на студенти от Excel
        axios.post('http://localhost:8081/students/add/excel', e.target.files[0], {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
            },
        })
            .then(response => {
                alert("Students added successfully!");
            })
            .catch(error => {
                alert("Error adding students!");
                handleApiError(error, navigate);
            });
    };

    const isButtonDisabled = () => {
        // ще върне true, ако някое от полетата е празно
        return studentData.firstName === '' || 
            studentData.lastName === '' || 
            studentData.FN === '' || 
            studentData.departmentId === '' || 
            studentData.collegeId === '' || 
            studentData.roomId === '';
    };

    return (
        <div>
            <h1>Add Student</h1>
            <form>
                <label>
                    First Name
                    <input type='text' name='firstName' value={studentData.firstName} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Last Name
                    <input type='text' name='lastName' value={studentData.lastName} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    FN
                    <input type='text' name='FN' value={studentData.FN} onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Department
                    <select name='departmentId' value={studentData.departmentId} onChange={handleInputChange}>
                        <option value=''>Select department</option>
                        {departments.map(department => (
                            <option key={department.id} value={department.id}>{department.departmentName}</option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    College
                    <select name='collegeId' value={studentData.collegeId} onChange={handleInputChange}>
                        <option value=''>Select college</option>
                        {colleges.map(college => (
                            <option key={college.id} value={college.id}>{college.collegeName}</option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Room
                    <select name='roomId' value={studentData.roomId} onChange={handleInputChange}>
                        <option value=''>Select room</option>
                        {rooms.map(room => (
                            <option key={room.id} value={room.id}>{room.roomNumber}</option>
                        ))}
                    </select>
                </label>
                <br />
                <button type='button' onClick={handleNormalInsert} 
                    disabled={isButtonDisabled()}
                    title = {isButtonDisabled() ? "All fields are required" : ""}
                >
                    Add Student
                </button>
                <br />
                <label>
                    Upload Excel File:
                    <input type="file" accept=".xls, .xlsx" onChange={handleExcelInsert} />
                </label>
            </form>
        </div>
    );
}

export default AddStudent;
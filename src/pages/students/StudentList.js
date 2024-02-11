import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import handleApiError from '../../utils/handleApiError';
import '../../css/Table.css';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();
    //взима се ролята на потребителя от jwt токена
    const isAdmin = localStorage.getItem('jwtToken') ? JSON.parse(atob(localStorage.getItem('jwtToken').split('.')[1])).role === 'ADMIN' : false;

    useEffect(() => {
        // извиква се endpoint-а за взимане на всички студенти
        axios.get('http://localhost:8081/students/all', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
            },
        })
            .then(response => setStudents(response.data))
            .catch(error => handleApiError(error, navigate));
    }, []);//[] означава, че този useEffect ще се изпълни само веднъж, когато се зареди компонента

    const handleUpdate = (id) => {
        // пренасочва към страницата за редактиране на студент като подава id-то на студента
        navigate(`/student/update/${id}`);
    };

    const handleDelete = (id) => {
        // извиква се endpoint-а за изтриване на студент
        axios.delete(`http://localhost:8081/students/${id}/delete`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
            },
        })
            .then(response => {
                // отново извежда списъка с студенти, но без изтритите
                setStudents(prevStudents => prevStudents.filter(student => student.id !== id));
                alert('Student deleted successfully!');
            })
            .catch(error => handleApiError(error, navigate));
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>FN</th>
                    <th>Department</th>
                    <th>College</th>
                    <th>Room</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {students.map(student => (
                    <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.firstName}</td>
                        <td>{student.lastName}</td>
                        <td>{student.FN}</td>
                        <td>{student.department.departmentName}</td>
                        <td>{student.college.collegeName}</td>
                        <td>{student.room.roomNumber}</td>
                        <td>
                            <button 
                                onClick={() => handleUpdate(student.id)}
                                disabled={!isAdmin}
                                title={!isAdmin ? "You don't have authority to update" : ""}
                            >
                                Update
                            </button>
                            <button 
                                onClick={() => handleDelete(student.id)}
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
}

export default StudentList;
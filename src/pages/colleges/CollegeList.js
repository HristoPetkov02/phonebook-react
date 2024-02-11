import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import handleApiError from '../../utils/handleApiError';
import '../../css/Table.css';

const CollegeList = () => {
    const [colleges, setColleges] = useState([]);
    const navigate = useNavigate();
    // взима се ролята на потребителя от jwt токена
    const isAdmin = localStorage.getItem('jwtToken') ? JSON.parse(atob(localStorage.getItem('jwtToken').split('.')[1])).role === 'ADMIN' : false;
    
    useEffect(() => {
        // извиква се endpoint-а за взимане на всички колежи
        axios.get('http://localhost:8081/colleges/all',
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
            },
        })
        .then(response => setColleges(response.data))
        .catch(error => handleApiError(error, navigate));
    }, []);//[] означава, че този useEffect ще се изпълни само веднъж, когато се зареди компонента

    const handleUpdate = (id) => {
        // пренасочва към страницата за редактиране на колежа като подава id-то на колежа
        navigate(`/college/update/${id}`);
    };

    const handleDelete = (id) => {
        // извиква се endpoint-а за изтриване на колежа
        axios.delete(`http://localhost:8081/colleges/${id}/delete`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
            },
        })
        .then(response => {
            //отново извежда списъка с колежите, но без изтрития
            setColleges(prevColleges => prevColleges.filter(college => college.id !== id));
            alert('College deleted successfully!');
        })
        .catch(error => handleApiError(error, navigate));
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>College Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {colleges.map(college => (
                    <tr key={college.id}>
                        <td>{college.id}</td>
                        <td>{college.collegeName}</td>
                        <td>
                            <button
                                onClick={() => handleUpdate(college.id)}
                                disabled={!isAdmin}
                                title={!isAdmin ? "You don't have authority to update" : ""}
                            >
                                Update
                            </button>
                            <button
                                onClick={() => handleDelete(college.id)}
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

export default CollegeList;
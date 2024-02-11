import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import handleApiError from '../../utils/handleApiError';
import '../../css/Table.css';

const BuildingList = () => {
    const [buildings, setBuildings] = useState([]);
    const navigate = useNavigate();
    // използва се за проверка дали потребителят е администратор
    const isAdmin = localStorage.getItem('jwtToken') ? JSON.parse(atob(localStorage.getItem('jwtToken').split('.')[1])).role === 'ADMIN' : false;

    useEffect(() => {
        // извиква се endpoint-а за взимане на всички сгради
        axios.get('http://localhost:8081/buildings/all',
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
            },
        })
        .then(response => setBuildings(response.data))
        .catch(error => handleApiError(error, navigate));
    }, []); //[] означава, че този useEffect ще се изпълни само веднъж, когато се зареди компонента

    const handleUpdate = (id) => {
        // пренасочва към страницата за редактиране на сградата като подава id-то на сградата
        navigate(`/building/update/${id}`);
    };

    const handleDelete = (id) => {
        // извиква се endpoint-а за изтриване на сградата
        axios.delete(`http://localhost:8081/buildings/${id}/delete`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
            },
        })
        .then(response => {
            // отново извежда списъка с сградите, но без изтритата
            setBuildings(prevBuildings => prevBuildings.filter(building => building.id !== id));
            alert('Building deleted successfully!');
        })
        .catch(error => handleApiError(error, navigate));
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Building Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {buildings.map((building) => (
                    <tr key={building.id}>
                        <td>{building.id}</td>
                        <td>{building.buildingName}</td>
                        <td>
                            <button
                                onClick={() => handleUpdate(building.id)}
                                disabled={!isAdmin}
                                title={!isAdmin ? "You don't have authority to update" : ""}
                            >
                                Update
                            </button>
                            <button
                                onClick={() => handleDelete(building.id)}
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

export default BuildingList;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import handleApiError from '../../utils/handleApiError';
import '../../css/Table.css';

const RoomList = () => {
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();
    //взима се ролята на потребителя от jwt токена
    const isAdmin = localStorage.getItem('jwtToken') ? JSON.parse(atob(localStorage.getItem('jwtToken').split('.')[1])).role === 'ADMIN' : false;

    useEffect(() => {
        // извиква се endpoint-а за взимане на всички стаи
        axios.get('http://localhost:8081/rooms/all', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
            },
        })
            .then(response => setRooms(response.data))
            .catch(error => handleApiError(error, navigate));
    }, []);//[] означава, че този useEffect ще се изпълни само веднъж, когато се зареди компонента

    const handleUpdate = (id) => {
        // пренасочва към страницата за редактиране на стая като подава id-то на стая
        navigate(`/room/update/${id}`);
    };

    const handleDelete = (id) => {
        // извиква се endpoint-а за изтриване на стая
        axios.delete(`http://localhost:8081/rooms/${id}/delete`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
            },
        })
            .then(response => {
                // отново извежда списъка с стаи, но без изтритата
                setRooms(prevRooms => prevRooms.filter(room => room.id !== id));
                alert('Room deleted successfully!');
            })
            .catch(error => handleApiError(error, navigate));
    };

//ако има сграда, извежда името ѝ, ако няма - извежда съобщение

    return (
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Room Number</th>
                    <th>Phone</th>
                    <th>Building</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {rooms.map(room => (
                    <tr key={room.id}>
                        <td>{room.id}</td>
                        <td>{room.roomNumber}</td>
                        <td>{room.phone}</td>
                        <td>{room.building ? room.building.buildingName : 'No Building yet'}</td>
                        <td>
                            <button 
                                onClick={() => handleUpdate(room.id)}
                                disabled={!isAdmin}
                                title={!isAdmin ? "You don't have authority to update" : ""}
                            >
                                Update
                            </button>
                            <button 
                                onClick={() => handleDelete(room.id)}
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

export default RoomList;
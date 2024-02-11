import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import handleApiError from '../../utils/handleApiError';

const AddRoom = () => {
    const [roomData, setRoomData] = useState({
        roomNumber: '',
        phone: '',
        buildingId: '', // тук се пази id-то на сградата
    });
    const navigate = useNavigate();

    const [buildings, setBuildings] = useState([]);

    useEffect(() => {
        // използва се endpoint-а за взимане на всички сгради
        axios.get('http://localhost:8081/buildings/all', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
            },
        })
            .then(response => setBuildings(response.data))
            .catch(error => handleApiError(error, navigate));
    }, []);//[] означава, че този useEffect ще се изпълни само веднъж, когато се зареди компонента

    const handleInputChange = (e) => {
        setRoomData({
            ...roomData,
            [e.target.name]: e.target.value,
        });
    };

    const handleNormalInsert = () => {
        // създава се обект с данните за стаята
        const requestData = {
            roomNumber: roomData.roomNumber,
            phone: roomData.phone,
            building: {
                id: roomData.buildingId,
            },
        };

        // използва се endpoint-а за вмъкване на стая
        axios.post('http://localhost:8081/rooms/add', requestData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
            },
        })
            .then(response => {
                alert("Room added successfully!");
            })
            .catch(error => {
                alert("Error adding room!");
                handleApiError(error, navigate);
            });
    };

    const handleExcelInsert = (e) => {
        // използва се endpoint-а за вмъкване на стаи от Excel
        axios.post('http://localhost:8081/rooms/add/excel', e.target.files[0], {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                alert("Rooms added successfully!");
            })
            .catch(error => {
                alert("Error adding rooms!");
                handleApiError(error, navigate);
            });
    };

    const isButtonDisabled = () => {
        // ще върне true, ако има празно поле
        return roomData.roomNumber === '' || roomData.phone === '' || roomData.buildingId === '';
    };

    return (
        <div>
            <h1>Add Room</h1>
            <form>
                <label>
                    Room Number:
                    <input type="number" defaultValue={0} name="roomNumber" onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Phone:
                    <input type="text" name="phone" onChange={handleInputChange} />
                </label>
                <br />
                <label>
                    Building:
                    <select name="buildingId" value={roomData.buildingId} onChange={handleInputChange}>
                        <option value="">Select building</option>
                        {buildings.map(building => (
                            <option key={building.id} value={building.id}>{building.buildingName}</option>
                        ))}
                    </select>
                </label>
                <br />
                <button type="button" onClick={handleNormalInsert}
                    disabled={isButtonDisabled()}
                    title={isButtonDisabled() ? "All fields are required" : ""}
                >Add Room</button>
                <br />
                <label>
                    Upload Excel File:
                    <input type="file" accept=".xls, .xlsx" onChange={handleExcelInsert} />
                </label>
            </form>
        </div>
    );
}

export default AddRoom;
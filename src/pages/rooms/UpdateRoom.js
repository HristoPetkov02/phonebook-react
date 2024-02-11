import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import handleApiError from '../../utils/handleApiError';

const UpdateRoom = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [roomData, setRoomData] = useState({
        roomNumber: '',
        phone: '',
        buildingId: '',// тук се пази id-то на сградата
    });

    const [buildings, setBuildings] = useState([]);

    useEffect(() => {
        // използва се async функция, за да се изчака зареждането на данните
        // async e асинхронна функция
        // await изчаква да се получи отговор от еndpoint-а
        // това позволява да се запишат данните и да се изобразяват във form за редактиране
        // ако не се ползва асинхронна функция с await, не всички данни ще се заредят
        const fetchData = async () => {
            try {
                // взима стаята по id-то ѝ
                const roomResponse = await axios.get(`http://localhost:8081/rooms/${id}/find`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
                    },
                });
                // запазва се стаята
                const room = roomResponse.data;

                // чрез spread оператора се запазват старите данни и се добавят новите
                setRoomData(prevRoomData => ({
                    ...prevRoomData,
                    roomNumber: room.roomNumber,
                    phone: room.phone,
                    // ако има ново id на сградата, то се запазва, иначе се запазва старото
                    buildingId: prevRoomData.buildingId || room.building.id,
                }));
                // взима всички сгради
                const buildingsResponse = await axios.get('http://localhost:8081/buildings/all', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
                    },
                });

                setBuildings(buildingsResponse.data);
            } catch (error) {
                handleApiError(error, navigate);
            }
        };

        fetchData();
    }, [id, navigate]); // [id, navigate] са добавени като зависимости

    const handleChange = (e) => {
        // чрез spread оператора се запазват старите данни и се добавят новите
        setRoomData({ ...roomData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        // e.preventDefault() предотвратява презареждането на страницата
        e.preventDefault();
        // променя структурата на request payload-а
        const requestData = {
            roomNumber: roomData.roomNumber,
            phone: roomData.phone,
            building: {
                id: roomData.buildingId,
            },
        };
        // използва се endpoint-а за редактиране на стая
        axios.put(`http://localhost:8081/rooms/${id}/update`, requestData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
            },
        })
            .then(response => {
                alert("Room updated successfully!");
                navigate('/room/list');
            })
            .catch(error => {
                alert("Error updating room!");
                handleApiError(error, navigate);
            });
    };

    const isButtonDisabled = () => {
        // ще върне true, ако има празно поле
        return roomData.roomNumber === '' || roomData.phone === '' || roomData.buildingId === '';
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Room Number</label>
                <input type="number" name="roomNumber" value={roomData.roomNumber} onChange={handleChange} />
            </div>
            <div>
                <label>Phone</label>
                <input type="text" name="phone" value={roomData.phone} onChange={handleChange} />
            </div>
            <div>
                <label>Building</label>
                <select name="buildingId" value={roomData.buildingId} onChange={handleChange}>
                    <option value="">Select Building</option>
                    {buildings.map(building => (
                        <option key={building.id} value={building.id}>
                            {building.buildingName}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" 
                disabled={isButtonDisabled()}
                title = {isButtonDisabled() ? "All fields are required" : ""}
            >Update Room</button>
        </form>
    );
};

export default UpdateRoom;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import handleApiError from '../../utils/handleApiError';

const UpdateBuilding = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [building, setBuilding] = useState({
        buildingName: '',
    });

    useEffect(() => {
        // извлича се сградата по id-то й
        axios.get(`http://localhost:8081/buildings/${id}/find`,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
            },
        })
        .then(response => setBuilding(response.data))
        .catch(error => handleApiError(error, navigate));
    }, [id]);//[id] e добавен като зависимост
    // при промяна на id-то ще се извика отново useEffect

    const handleChange = (e) => {
        setBuilding({ ...building, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        //e.preventDefault() предотвратява презареждането на страницата
        e.preventDefault();

        // използва се endpoint-а за редактиране на сградата
        axios.put(`http://localhost:8081/buildings/${id}/update`, building,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
            },
        })
        .then(response => {
            alert('Building updated successfully!');
            // връща обратно към списъка с сградите
            navigate('/building/list');
        })
        .catch(error => handleApiError(error, navigate));
    };

    const isButtonDisabled = () => {
        // ще върне true, ако името на сградата е празно
        // ще го използвам за деактивиране на бутона
        return building.buildingName === '';
    };

    return (
        <div>
            <h1>Update Building</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Building Name:
                    <input type="text" name="buildingName" value={building.buildingName} onChange={handleChange} />
                </label>
                <br />
                <button type="submit"
                    disabled={isButtonDisabled()} 
                    title={isButtonDisabled() ? "All fields are required" : ""}
                >Update Building</button>
            </form>
        </div>
    );
}

export default UpdateBuilding;
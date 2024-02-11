import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import handleApiError from '../../utils/handleApiError';

const UpdateCollege = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [college, setCollege] = useState({'collegeName': ''});

    useEffect(() => {
        // извлича колежа по id-то му
        axios.get(`http://localhost:8081/colleges/${id}/find`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
            },
        })
        .then(response => setCollege(response.data))
        .catch(error => handleApiError(error, navigate));
    }, [id]);//[id] e добавен като зависимост
    // при промяна на id-то ще се извика отново useEffect

    const handleChange = (e) => {
        setCollege({ ...college, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => { 
        //e.preventDefault() предотвратява презареждането на страницата
        e.preventDefault();
        // използва се endpoint-а за редактиране на колеж
        axios.put(`http://localhost:8081/colleges/${id}/update`, college, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
            },
        })
        .then(response => {
            alert('College updated successfully!');
            // връща обратно към списъка с колежи
            navigate('/college/list');
        })
        .catch(error => handleApiError(error, navigate));
    };

    const isButtonDisabled = () => {
        // ще върне true, ако името на колежа е празно
        // ще го използвам за деактивиране на бутона
        return college.collegeName === '';
    };

    return (
        <div>
            <h1>Update College</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    College Name:
                    <input type="text" name="collegeName" value={college.collegeName} onChange={handleChange} />
                </label>
                <br />
                <button type="submit"
                    disabled={isButtonDisabled()}
                    title={isButtonDisabled() ? "All fields are required" : ""}
                >Update College</button>
            </form>
        </div>
    );
}

export default UpdateCollege;
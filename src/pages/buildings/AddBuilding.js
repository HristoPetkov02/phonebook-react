import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import handleApiError from '../../utils/handleApiError';

const AddBuilding = () => {
    const [buildingData, setBuildingData] = useState({
        buildingName: '',
    });
    const navigate = useNavigate();
    
    const handleInputChange = (e) => {
        setBuildingData({
        ...buildingData,
        [e.target.name]: e.target.value,
        });
    };
    
    const handleNormalInsert = () => {
        // използва се endpoint-а за вмъкване на сграда
        axios.post('http://localhost:8081/buildings/add', buildingData,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
            },
        })
        .then(response => {
            alert("Building added successfully!");
    
        })
        .catch(error => {
            alert("Error adding building!");
            handleApiError(error, navigate);
        });
    };
    
    const handleExcelInsert = (e) => {
        // използва се endpoint-а за вмъкване на сгради от Excel
        const file = e.target.files[0];
    
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
    
            axios.post('http://localhost:8081/buildings/add/excel', formData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
                },
            })
            .then(response => {
                alert("Buildings added successfully!");
            })
            .catch(error => {
                alert("Error adding buildings!");
                handleApiError(error, navigate);
            });
        }
    };

    const isButtonDisabled = () => {
        // ще върне true, ако името на сградата е празно
        // ще го използвам за деактивиране на бутона
        return buildingData.buildingName === '';
    };

    return (
        <div>
            <h1>Add Building</h1>
            <form>
                <label>
                    Building Name:
                    <input type="text" name="buildingName" value={buildingData.buildingName} onChange={handleInputChange} />
                </label>
                <br />
                <button type="button" onClick={handleNormalInsert}
                    disabled={isButtonDisabled()}
                    title={isButtonDisabled() ? "All fields are required" : ""}
                >Add Building</button>
                <br />
                <label>
                    Upload Excel File:
                    <input type="file" accept=".xls, .xlsx" onChange={handleExcelInsert} />
                </label>
            </form>
        </div>
    );
}

export default AddBuilding;
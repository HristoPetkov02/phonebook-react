import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import handleApiError from '../../utils/handleApiError';

const AddCollege = () => {
    const [collegeData, setCollegeData] = useState({
        collegeName: '',
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        setCollegeData({
            ...collegeData,
            [e.target.name]: e.target.value,
        });
    };

    const handleNormalInsert = () => {
        //използва се endpoint-а за вмъкване на колеж
        axios.post('http://localhost:8081/colleges/add', collegeData,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
            },
        })
        .then(response => {
            alert("College added successfully!");
        })
        .catch(error => {
            alert("Error adding college!");
            handleApiError(error, navigate);
        });
    };

    const handleExcelInsert = (e) => {
        //използва се endpoint-а за вмъкване на колежи от Excel
        const file = e.target.files[0];

        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            axios.post('http://localhost:8081/colleges/add/excel', formData,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
                },
            })
            .then(response => {
                alert("Colleges added successfully!");
            })
            .catch(error => {
                alert("Error adding colleges!");
                handleApiError(error, navigate);
            });
        }
    };

    const isButtonDisabled = () => {
        //ще върне true, ако името на колежа е празно
        //ще го използвам за деактивиране на бутона
        return collegeData.collegeName === '';
    };

    return (
        <div>
            <h1>Add College</h1>
            <form>
                <label>College Name:
                    <input type="text" name="collegeName" onChange={handleInputChange} />
                </label>
                <br />
                <button onClick={handleNormalInsert}
                    disabled={isButtonDisabled()}
                    title={isButtonDisabled() ? "All fields are required" : ""}
                >Insert College</button>
                <br />
                <label>Upload Excel:
                    <input type="file" name="file" onChange={handleExcelInsert} />
                </label>
            </form>
        </div>
    );
}

export default AddCollege;
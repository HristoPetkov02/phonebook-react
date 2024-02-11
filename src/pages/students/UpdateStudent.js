import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import handleApiError from '../../utils/handleApiError';

const UpdateStudent = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [studentData, setStudentData] = useState({
        firstName: '',
        lastName: '',
        FN: '',
        departmentId: '',
        collegeId: '',
        roomId: '',
    });

    const [departments, setDepartments] = useState([]);
    const [colleges, setColleges] = useState([]);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        // използва се async функция, за да се изчака зареждането на данните
        // async e асинхронна функция
        // await изчаква да се получи отговор от еndpoint-а
        // това позволява да се запишат данните и да се изобразяват във form за редактиране
        // ако не се ползва асинхронна функция с await, не всички данни ще се заредят
        const fetchData = async () => {
            try {
                // взима студента по id-то му
                const studentResponse = await axios.get(`http://localhost:8081/students/${id}/find`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
                    },
                });
                // запазва се студента
                const student = studentResponse.data;

                // чрез spread оператора се запазват старите данни и се добавят новите
                setStudentData(prevStudentData => ({
                    ...prevStudentData,
                    firstName: student.firstName,
                    lastName: student.lastName,
                    FN: student.FN,
                    // ако има ново id на катедра, то се запазва, иначе се запазва старото
                    departmentId: prevStudentData.departmentId || student.department.id,
                    // ако има ново id на колеж, то се запазва, иначе се запазва старото
                    collegeId: prevStudentData.collegeId || student.college.id,
                    // ако има ново id на стая, то се запазва, иначе се запазва старото
                    roomId: prevStudentData.roomId || student.room.id,
                }));
                // взима всички катедри
                const departmentsResponse = await axios.get('http://localhost:8081/departments/all', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
                    },
                });

                setDepartments(departmentsResponse.data);

                // взима всички колежи
                const collegesResponse = await axios.get('http://localhost:8081/colleges/all', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
                    },
                });

                setColleges(collegesResponse.data);

                // взима всички стаи
                const roomsResponse = await axios.get('http://localhost:8081/rooms/all', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
                    },
                });

                setRooms(roomsResponse.data);
            } catch (error) {
                handleApiError(error, navigate);
            }
        };

        fetchData();
    }, [id, navigate]); // [id, navigate] са добавени като зависимости

    const handleChange = (e) => {
        // чрез spread оператора се запазват старите данни и се добавят новите
        setStudentData({ ...studentData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        // e.preventDefault() предотвратява презареждането на страницата
        e.preventDefault();

        // променя структурата на payload-а
        const requestData = {
            firstName: studentData.firstName,
            lastName: studentData.lastName,
            FN: studentData.FN,
            department: {
                id: studentData.departmentId,
            },
            college: {
                id: studentData.collegeId,
            },
            room: {
                id: studentData.roomId,
            },
        }

        // извиква се endpoint-а за редактиране на студента
        axios.put(`http://localhost:8081/students/${id}/update`, requestData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
            },
        })
            .then(response => {
                alert('Student updated successfully!');
                navigate('/student/list');
            })
            .catch(error => handleApiError(error, navigate));
    };

    const isButtonDisabled = () => {
        // ще върне true, ако някое от полетата е празно
        return studentData.firstName === '' || 
            studentData.lastName === '' || 
            studentData.FN === '' || 
            studentData.departmentId === '' || 
            studentData.collegeId === '' || 
            studentData.roomId === '';
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>First Name</label>
                <input type='text' name='firstName' value={studentData.firstName} onChange={handleChange} />
            </div>
            <div>
                <label>Last Name</label>
                <input type='text' name='lastName' value={studentData.lastName} onChange={handleChange} />
            </div>
            <div>
                <label>FN</label>
                <input type='text' name='FN' value={studentData.FN} onChange={handleChange} />
            </div>
            <div>
                <label>Department</label>
                <select name='departmentId' value={studentData.departmentId} onChange={handleChange}>
                    <option value=''>Select department</option>
                    {departments.map(department => (
                        <option key={department.id} value={department.id}>{department.departmentName}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>College</label>
                <select name='collegeId' value={studentData.collegeId} onChange={handleChange}>
                    <option value=''>Select college</option>
                    {colleges.map(college => (
                        <option key={college.id} value={college.id}>{college.collegeName}</option>
                    ))}
                </select>
            </div>
            <div>
                <label>Room</label>
                <select name='roomId' value={studentData.roomId} onChange={handleChange}>
                    <option value=''>Select room</option>
                    {rooms.map(room => (
                        <option key={room.id} value={room.id}>{room.roomNumber}</option>
                    ))}
                </select>
            </div>
            <button type='submit' 
                disabled={isButtonDisabled()}
                title={isButtonDisabled() ? "All fields are required" : ""}
            >
                Update Student
            </button>
        </form>
    );
};

export default UpdateStudent;

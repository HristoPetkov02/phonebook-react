//import logo from './logo.svg';
//import './App.css';

import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';

import Login from './pages/forAccounts/Login';
import Accounts from './pages/forAccounts/Accounts';
import AccountDetails from './pages/forAccounts/AccountDetails';
import AccountManagment from './pages/forAccounts/AccountManagement';
import Register from './pages/forAccounts/Register';

import FacultyList from './pages/faculties/FacultyList';
import UpdateFaculty from './pages/faculties/UpdateFaculty';
import AddFaculty from './pages/faculties/AddFaculty';

import DepartmentList from './pages/departments/DepartmentList';
import UpdateDepartment from './pages/departments/UpdateDepartment';
import AddDepartment from './pages/departments/AddDepartment';

import CollegeList from './pages/colleges/CollegeList';
import UpdateCollege from './pages/colleges/UpdateCollege';
import AddCollege from './pages/colleges/AddCollege';

import BuildingList from './pages/buildings/BuildingList';
import UpdateBuilding from './pages/buildings/UpdateBuilding';
import AddBuilding from './pages/buildings/AddBuilding';

import RoomList from './pages/rooms/RoomList';
import UpdateRoom from './pages/rooms/UpdateRoom';
import AddRoom from './pages/rooms/AddRoom';  

import StudentList from './pages/students/StudentList';
import UpdateStudent from './pages/students/UpdateStudent';
import AddStudent from './pages/students/AddStudent';


import Home from './pages/Home';





export default function App() {
  return (
    <Router>
      <Routes >
        <Route exact path="/" element={<Home/>} />

        <Route exact path="/account/register" element={<Register/>} />
        <Route exact path="/account/login" element={<Login/>} />
        <Route exact path="/account/all" element={<Accounts/>} />
        <Route exact path="/account/details" element={<AccountDetails/>} />
        <Route exact path="/account/management" element={<AccountManagment/>} />

        <Route exact path="/faculty/list" element={<FacultyList/>} />
        <Route exact path="/faculty/update/:id" element={<UpdateFaculty/>} />
        <Route exact path="/faculty/add" element={<AddFaculty/>} />

        <Route exact path="/department/list" element={<DepartmentList/>} />
        <Route exact path="/department/update/:id" element={<UpdateDepartment/>} />
        <Route exact path="/department/add" element={<AddDepartment/>} />

        <Route exact path="/college/list" element={<CollegeList/>} />
        <Route exact path="/college/update/:id" element={<UpdateCollege/>} />
        <Route exact path="/college/add" element={<AddCollege/>} />

        <Route exact path="/building/list" element={<BuildingList/>} />
        <Route exact path="/building/update/:id" element={<UpdateBuilding/>} />
        <Route exact path="/building/add" element={<AddBuilding/>} />

        <Route exact path="/room/list" element={<RoomList/>} />
        <Route exact path="/room/update/:id" element={<UpdateRoom/>} />
        <Route exact path="/room/add" element={<AddRoom/>} />

        <Route exact path="/student/list" element={<StudentList/>} />
        <Route exact path="/student/update/:id" element={<UpdateStudent/>} />
        <Route exact path="/student/add" element={<AddStudent/>} />
      </Routes>
    </Router>
  );
}
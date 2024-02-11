import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.css';

const Home = () => {
    return (
        <div>
            <nav>
                <ul className="menu">
                    <li>
                        <Link to="/" className={'active'}>Home</Link>
                    </li>
                    <li>
                        <span>Faculties</span>
                        <ul className="submenu">
                            <li><Link to="/faculty/add" >Add</Link></li>
                            <li><Link to="/faculty/list" >List</Link></li>
                        </ul>
                    </li>
                    <li>
                        <span>Departments</span>
                        <ul className="submenu">
                            <li><Link to="/department/add" >Add</Link></li>
                            <li><Link to="/department/list" >List</Link></li>
                        </ul>
                    </li>
                    <li>
                        <span>Colleges</span>
                        <ul className="submenu">
                            <li><Link to="/college/add" >Add</Link></li>
                            <li><Link to="/college/list" >List</Link></li>
                        </ul>
                    </li>


                    <li>
                        <span>Buildings</span>
                        <ul className="submenu">
                            <li><Link to="/building/add" >Add</Link></li>
                            <li><Link to="/building/list" >List</Link></li>
                        </ul>
                    </li>
                    <li>
                        <span>Rooms</span>
                        <ul className="submenu">
                            <li><Link to="/room/add" >Add</Link></li>
                            <li><Link to="/room/list" >List</Link></li>
                        </ul>
                    </li>
                    <li>
                        <span>Students</span>
                        <ul className="submenu">
                            <li><Link to="/student/add" >Add</Link></li>
                            <li><Link to="/student/list" >List</Link></li>
                        </ul>
                    </li>
                    <li>
                        <span>Accounts</span>
                        <ul className="submenu">
                            <li><Link to="/account/details" >Details</Link></li>
                            <li><Link to="/account/management" >Management</Link></li>
                            <li><Link to="/account/list" >List</Link></li>
                            <li><Link to="/account/login" >Login</Link></li>
                            <li><Link to="/account/register">Register</Link></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Home;
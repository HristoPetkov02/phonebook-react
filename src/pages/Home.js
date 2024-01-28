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
                            <li><Link to="/facultie/add" >Add</Link></li>
                            <li><Link to="/facultie/list" >List</Link></li>
                            <li><Link to="/facultie/update" >Update</Link></li>
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
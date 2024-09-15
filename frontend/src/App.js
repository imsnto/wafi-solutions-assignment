import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faList, faPlus } from '@fortawesome/free-solid-svg-icons'; 

function App() {
  return (
    <Router>
       <div style={{ display: 'flex' }}>
        <div style={{
          width: '200px',
          padding: '20px',
          backgroundColor: '#f4f4f4',
          height: '100vh'
        }}>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li>
              <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
                <FontAwesomeIcon icon={faHome} style={{ marginRight: '10px' }} />
                Home
              </Link>
            </li>
            <li>
              <Link to="/employees" style={{ textDecoration: 'none', color: 'black' }}>
                <FontAwesomeIcon icon={faList} style={{ marginRight: '10px' }} />
                Employees
              </Link>
            </li>
            <li>
              <Link to="/add" style={{ textDecoration: 'none', color: 'black' }}>
                <FontAwesomeIcon icon={faPlus} style={{ marginRight: '10px' }} />
                Add Employee
              </Link>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/employees" element={<EmployeeList />} />
            <Route path="/add" element={<AddEmployee />} />
            <Route path="/edit/:id" element={<EditEmployee />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

const Home = () => (
  <div>
    <h1>Welcome to the Employee Management System</h1>
    <p>This is the home page. Use the sidebar to navigate.</p>
  </div>
);

export default App;

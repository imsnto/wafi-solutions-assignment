import React, { useState } from 'react';
import axios from 'axios';
import Resizer from 'react-image-file-resizer';
import { useNavigate } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import './AddEmployee.css';

const AddEmployee = () => {
    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        mobile: '',
        date_of_birth: '',
        photo: null  
    });
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleChange = (e) => {
        console.log('this is employee')
        console.log(e);
        
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setEmployee(prevState => ({
                ...prevState,
                [name]: files[0]
            }));
        } else {
            setEmployee(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', employee.name);
        formData.append('email', employee.email);
        formData.append('mobile', employee.mobile);
        formData.append('date_of_birth', employee.date_of_birth);
        
        if (employee.photo) {
            formData.append('photo', employee.photo);
        }

        axios.post(`http://127.0.0.1:8001/employee/api/employees/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(() => {
            navigate('/employees'); 
        })
        .catch(error => {
            setError('Error updating employee details');
        });
    };

    return (
        <div className="form-container">
            {error && <p className="error-message">{error}</p>}
            <h2 className="form-title">Add Employee</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Name:</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={employee.name}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Email:</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={employee.email}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Mobile:</label>
                    <input
                        type="text"
                        name="mobile"
                        placeholder="Mobile"
                        value={employee.mobile}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Date of Birth:</label>
                    <input
                        type="date"
                        name="date_of_birth"
                        value={employee.date_of_birth}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Photo:</label>
                    <input
                        type="file"
                        name="photo"
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <button type="submit" className="form-button">Add Employee</button>
            </form>
        </div>
    );
};

export default AddEmployee;

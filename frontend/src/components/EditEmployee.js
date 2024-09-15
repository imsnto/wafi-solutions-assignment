import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditEmployee = () => {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    mobile: '',
    date_of_birth: '',
    photo: null  
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://127.0.0.1:8001/employee/api/employees/${id}/`)
      .then(response => {
        setEmployee(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching employee details');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setEmployee({ ...employee, [name]: files[0] });
    } else {
      setEmployee({ ...employee, [name]: value });
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
  
    axios.put(`http://127.0.0.1:8001/employee/api/employees/${id}/`, formData, {
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
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="form-container">
      <h2 className="form-title">Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Name:</label>
          <input
            type="text"
            name="name"
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
            value={employee.email}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Mobile:</label>
          <input
            type="tel"
            name="mobile"
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
        <button type="submit" className="form-button">Update Employee</button>
      </form>
    </div>
  );
};

export default EditEmployee;

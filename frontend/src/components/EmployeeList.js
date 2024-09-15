import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

import SearchBox from './SearchBox';  
import './EmployeeList.css'; 

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    let sortParam = sortField ? `&ordering=${sortOrder === 'asc' ? '' : '-'}${sortField}` : '';
    axios.get(`http://127.0.0.1:8001/employee/api/employees/?page=${page}&search=${search}${sortParam}`)
      .then(response => {
        setEmployees(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 10)); // Assuming 10 items per page
      })
      .catch(error => console.error(error));
  }, [page, search, sortField, sortOrder]);

  const handleSearch = (term) => {
    setSearch(term);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      axios.delete(`http://127.0.0.1:8001/employee/api/employees/${id}/`)
        .then(() => {
          setEmployees(employees.filter(employee => employee.id !== id));
        })
        .catch(error => console.error('Error deleting employee:', error));
    }
  };

  const renderSortIcon = (field) => {
    if (sortField !== field) {
      return <FontAwesomeIcon icon={faSort} />;
    } else if (sortOrder === 'asc') {
      return <FontAwesomeIcon icon={faSortUp} />;
    } else {
      return <FontAwesomeIcon icon={faSortDown} />;
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button 
          key={i} 
          onClick={() => setPage(i)} 
          className={i === page ? 'active' : ''}
          style={{ margin: '0 5px', padding: '5px 10px', cursor: 'pointer', border: i === page ? '2px solid #000' : '1px solid #ccc' }}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div >
      <SearchBox searchTerm={search} onSearchChange={handleSearch} />

      <table>
        <thead>
          <tr>
            <th>Photo</th>
            <th onClick={() => handleSort('name')}>
              Name {renderSortIcon('name')}
            </th>
            <th onClick={() => handleSort('email')}>
              Email {renderSortIcon('email')}
            </th>
            <th onClick={() => handleSort('mobile')}>
              Mobile {renderSortIcon('mobile')}
            </th>
            <th onClick={() => handleSort('date_of_birth')}>
              Date of Birth {renderSortIcon('date_of_birth')}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map(employee => (
              <tr key={employee.id}>
                <td>
                  {employee.photo ? (
                    <img 
                      src={employee.photo} 
                      alt={employee.name} 
                      style={{ width: '70px', height: '60px', borderRadius: '0%' }} 
                    />
                  ) : (
                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#ccc' }} />
                  )}
                </td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.mobile}</td>
                <td>{employee.date_of_birth}</td>
                <td>
                  <Link to={`/edit/${employee.id}`}>
                    <FontAwesomeIcon icon={faEdit} style={{ marginRight: '10px', cursor: 'pointer' }} /> 
                  </Link>
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleDelete(employee.id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No employees found</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="pagination-controls" style={{ marginTop: '20px' }}>
        {renderPageNumbers()}
      </div>
    </div>
  );
}

export default EmployeeList;

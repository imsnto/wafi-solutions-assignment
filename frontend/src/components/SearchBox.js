import React from 'react';

function SearchBox({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar" style={{ marginBottom: '20px' }}>
      <input 
        type="text" 
        placeholder="Search by name or email, mobile, DOB" 
        value={searchTerm} 
        onChange={(e) => onSearchChange(e.target.value)} 
        style={{ padding: '10px', width: '98%', borderRadius: '5px', border: '1px solid #ccc' }}
      />
    </div>
  );
}

export default SearchBox;

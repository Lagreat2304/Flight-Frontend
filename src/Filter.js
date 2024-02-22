import React, { useState } from 'react';
import './Filter.css';

const Filter = ({ applyFilters, onFilterChange }) => {
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');

  const handleFilterApply = () => {
    applyFilters({ departure, destination });
  };


  return (
    <div className="filter-container">
      <label className="filter-label departure-label">Departure:</label>
      <input
        type="text"
        value={departure}
        onChange={(e) => setDeparture(e.target.value)}
        className="filter-input"
      />
      <label className="filter-label">Destination:</label>
      <input
        type="text"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        className="filter-input"
      />
      <button onClick={handleFilterApply} className="filter-btn">
        Apply Filters
      </button>
    </div>
  );
};

export default Filter;

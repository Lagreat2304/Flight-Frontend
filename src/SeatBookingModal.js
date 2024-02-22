import React, { useState } from 'react';

const SeatBookingModal = ({ isOpen, onClose, onConfirm }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleConfirm = () => {
    onConfirm({ name, age });
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Book Seat</h2>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <label>Age:</label>
        <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
        <button onClick={handleConfirm}>Confirm</button>
      </div>
    </div>
  );
};

export default SeatBookingModal;
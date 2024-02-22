import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import './Home.css';
import Filter from './Filter';
import ProfileIcon from './ProfileIcon';

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const flightsPerPage = 5;
  const alertRef = useRef(null);
  const navigate = useNavigate();
  const [filters, setFilters] = useState({});
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchData();
  }, [filters]);

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/filteredFlights', {
        params: filters,
      });
      console.log("Response from Server:", response.data);
      setFilteredFlights(response.data.flights);
      setTotalPages(Math.ceil(response.data.flights.length / flightsPerPage)); // Update total pages
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log('filteredFlights:', filteredFlights);
  }, [filteredFlights]);

  const handleBookSeat = async (flightNumber) => {
    try {
      const response = await axios.post('http://localhost:5000/bookSeat', { flightNumber });
      console.log(response.data);
      if (response.data.error) {
        setErrorMessage(`No seats Available in ${flightNumber} `);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        setSuccessMessage(`Seat Booked in ${flightNumber}`);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (alertRef.current) {
      alertRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [errorMessage, successMessage]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setErrorMessage('');
      setSuccessMessage('');
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, [errorMessage, successMessage]);

  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
  const currentFlights = filteredFlights.slice(indexOfFirstFlight, indexOfLastFlight);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {errorMessage && (
        <div className="message-box error" ref={alertRef}>
          <Stack spacing={2} sx={{ width: '100%' }}>
            <Alert severity="error" onClose={() => setErrorMessage('')}>
              {errorMessage}
            </Alert>
          </Stack>
        </div>
      )}
      {successMessage && (
        <div className="message-box success" ref={alertRef}>
          <Stack spacing={2} sx={{ width: '100%' }}>
            <Alert severity="success" onClose={() => setSuccessMessage('')}>
              {successMessage}
            </Alert>
          </Stack>
        </div>
      )}
      <div className="top-right-container">
        <ProfileIcon />
      </div>
      <h2 className='header'>Flight Details</h2>
      <Filter applyFilters={applyFilters} onFilterChange={handleFilterChange} />
      <table className="flight-table">
        <thead>
          <tr>
            <th>Flight Number</th>
            <th>Airline</th>
            <th>Departure</th>
            <th>Destination</th>
            <th>Destination Date & Time</th>
            <th>Arrival Date & Time</th>
            <th>Seats Available</th>
            <th>Book</th>
          </tr>
        </thead>
        <tbody>
          {currentFlights.map((flight) => (
            <tr key={flight.FlightNumber}>
              <td>{flight.FlightNumber}</td>
              <td>{flight.Airline}</td>
              <td>{flight.Departure}</td>
              <td>{flight.Destination}</td>
              <td>{flight.destination_date_time}</td>
              <td>{flight.arrival_date_time}</td>
              <td>{flight.Seats}</td>
              <td><button className='book-seat-btn' onClick={() => handleBookSeat(flight.FlightNumber)}>Book Seat</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-container">
        {[...Array(totalPages).keys()].map((number) => (
          <button key={number + 1} onClick={() => paginate(number + 1)}>
            {number + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;

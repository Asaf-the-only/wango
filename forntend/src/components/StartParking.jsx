import React, { useState } from 'react';
import axios from 'axios';
import { CITIES } from './stubData'; // Assuming you have the data in 'stubData.js'

function StartParking() {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedParkingArea, setSelectedParkingArea] = useState('');

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setSelectedParkingArea(''); // Reset parking area when city changes
  };

  const handleStartParking = () => {
    const email = localStorage.getItem('userEmail'); // Assuming user email is stored after login
    const cityId = selectedCity;
    const parkingAreaId = selectedParkingArea;

    if (!cityId || !parkingAreaId) {
      alert('Please select both a city and parking area');
      return;
    }

    axios.post('http://localhost:8000/api/parking/start-parking', { email, cityId, parkingAreaId })
      .then(() => alert('Parking started successfully!'))
      .catch((err) => alert('Error starting parking: ' + err.message));
  };

  return (
    <div className="container">
      <h2>Start Parking</h2>
      <div className="form-group">
        <label>Select City</label>
        <select className="form-control" onChange={handleCityChange} value={selectedCity}>
          <option value="">Select City</option>
          {CITIES.map((city) => (
            <option key={city.id} value={city.id}>{city.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Select Parking Area</label>
        <select className="form-control" onChange={(e) => setSelectedParkingArea(e.target.value)} value={selectedParkingArea}>
          <option value="">Select Parking Area</option>
          {selectedCity && CITIES.find(city => city.id === parseInt(selectedCity)).parkingAreas.map((area) => (
            <option key={area.id} value={area.id}>{area.name}</option>
          ))}
        </select>
      </div>
      <button className="btn btn-primary" onClick={handleStartParking}>Start Parking</button>
    </div>
  );
}

export default StartParking;

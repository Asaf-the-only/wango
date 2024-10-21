import React, { useState } from 'react';
import axios from 'axios';

function StopParking() {
  const [parkingId, setParkingId] = useState('');

  const handleStopParking = () => {
    const email = localStorage.getItem('userEmail');

    axios.post('http://localhost:8000/api/parking/stop-parking', { email, parkingId })
      .then((response) => alert(`Parking stopped. Total price: $${response.data.price}`))
      .catch((err) => alert('Error stopping parking: ' + err.message));
  };

  return (
    <div className="container">
      <h2>Stop Parking</h2>
      <div className="form-group">
        <label>Parking ID</label>
        <input
          type="text"
          className="form-control"
          value={parkingId}
          onChange={(e) => setParkingId(e.target.value)}
          placeholder="Enter parking ID"
        />
      </div>
      <button className="btn btn-danger" onClick={handleStopParking}>Stop Parking</button>
    </div>
  );
}

export default StopParking;

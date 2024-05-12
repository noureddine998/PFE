import React, { useState, useEffect } from 'react';
import './CreateDistrict.css';
import { regions, constituencies } from '../../data/Districts';
import axios from 'axios';
import { axiosClient } from '../../api/axios';

const DistrictType = {
  local: 'local',
  regional: 'regional'
};

const CreateDistrict = ({ onSubmit }) => {
  const [districtType, setDistrictType] = useState(DistrictType.local);
  const [districtName, setDistrictName] = useState('');
  const [seatsToWin, setSeatsToWin] = useState(0);
  const [districtOptions, setDistrictOptions] = useState([]);

  useEffect(() => {
    if (districtType === DistrictType.local) {
      setDistrictOptions(constituencies);
    } else if (districtType === DistrictType.regional) {
      setDistrictOptions(regions);
    }
    setDistrictName('');
  }, [districtType]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      district_type: districtType,
      district_name: districtName,
      seats_to_win: seatsToWin
    };
    axiosClient.post('/api/districts', data)
      .then(response => {
        onSubmit(response.data); // Update parent component with new district data
        console.log('Success:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="form-container">
      <h1>Create District</h1>
      <form onSubmit={handleSubmit}>
        <label>
          District Type:
          <select value={districtType} onChange={e => setDistrictType(e.target.value)}>
            <option value={DistrictType.local}>Local</option>
            <option value={DistrictType.regional}>Regional</option>
          </select>
        </label>
        <label>
          District Name:
          <select value={districtName} onChange={e => setDistrictName(e.target.value)} required>
            <option value="">Select District Name</option>
            {districtOptions.map((name, index) => (
              <option key={index} value={name}>{name}</option>
            ))}
          </select>
        </label>
        <label>
          Seats to Win:
          <input type="number" value={seatsToWin} onChange={e => setSeatsToWin(parseInt(e.target.value, 10))} required />
        </label>
        <button type="submit">Create District</button>
      </form>
      <div className="note">
        Note: District creation will take several minutes.
      </div>
    </div>
  );
};

export default CreateDistrict;

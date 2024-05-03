import React, { useState } from 'react';
import './AdminAddCandidate.css';
import axios from 'axios';

import { regions, constituencies, parties } from '../../data/Districts';
import { axiosClient } from '../../api/axios';


// Enum definitions to match the smart contract
const Gender = {
  male: 'male',
  female: 'female',
  other: 'other'
};

const DistrictType = {
  local: 'local',
  regional: 'regional'
};

function AddCandidateForm({ onSubmit }) {
  // State for each form field
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [party, setParty] = useState('');
  const [districtType, setDistrictType] = useState('');
  const [districtName, setDistrictName] = useState('');

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct the candidate data
    const candidateData = {
      full_name: fullName,
      age: parseInt(age, 10),
      gender,
      party,
      district_type: districtType,
      district_name: districtName
  };

    // Optional: Add validation based on the smart contract requirements before submitting
    if ((districtType === DistrictType.local || districtType === DistrictType.regional) &&
        (districtType !== DistrictType.regional || (age > 18 && age < 40) || gender === Gender.female)) {
      onSubmit(candidateData);
    } else {
      alert("Please make sure all fields are filled correctly according to the rules.");
    }
    axiosClient.post('/api/candidates', candidateData)
        .then(response => {
            console.log('Candidate added:', response.data);
            // Handle success, e.g., clearing the form, notifying the user, etc.
        })
        .catch(error => {
            console.error('Error adding candidate:', error);
            // Handle error, e.g., showing an error message
        });

  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <label>
        Full Name:
        <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} required />
      </label>
      <label>
        Age:
        <input type="number" value={age} onChange={e => setAge(e.target.value)} required />
      </label>
      <label>
        Gender:
        <select value={gender} onChange={e => setGender(e.target.value)} required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </label>
      <label>
        Party:
        <select value={party} onChange={e => setParty(e.target.value)} required>
          <option value="">Select Party</option>
          {parties.map(party => <option key={party} value={party}>{party}</option>)}
        </select>
      </label>
      <label>
        District Type:
        <select value={districtType} onChange={e => setDistrictType(e.target.value)} required>
          <option value="">Select District Type</option>
          <option value="local">Local</option>
          <option value="regional">Regional</option>
        </select>
      </label>
      <label>
        District Name:
        <select value={districtName} onChange={e => setDistrictName(e.target.value)} required>
          <option value="">Select District Name</option>
          {districtType === DistrictType.local && constituencies.map(name => <option key={name} value={name}>{name}</option>)}
          {districtType === DistrictType.regional && regions.map(name => <option key={name} value={name}>{name}</option>)}
        </select>
      </label>
      <button type="submit">Add Candidate</button>
    </form>
  );
}

export default AddCandidateForm;

import React, { useState } from 'react';
import './AddVoter.css';

const AddVoter = ({ onSubmit }) => {
  const [cin, setCIN] = useState('');
  const [email, setEmail] = useState('');

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    // Construct the voter data
    const voterData = {
      cin,
      email
    };

    onSubmit(voterData);
  };

  // Corrected return statement
  return (
    <div>
      <form onSubmit={handleSubmit} className="form-voter">
        <label>
          cin:
          <input type='text' value={cin} onChange={e => setCIN(e.target.value)} required/>
        </label>
        <label>
          Email:
          <input type='email' value={email} onChange={e => setEmail(e.target.value)} required/>
        </label>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddVoter;

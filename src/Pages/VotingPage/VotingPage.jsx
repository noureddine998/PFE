import React, { useState } from 'react';
import './VotingPage.css'; // Make sure the CSS file name matches this import

const DistrictTables = () => {
  // Example data for regional districts
  const regionalData = [
    { name: "Alice Johnson", party: "Liberal", votes: 1234 },
    { name: "Bob Smith", party: "Conservative", votes: 2345 },
    { name: "Carlos Ruiz", party: "Green", votes: 3456 }
  ];

  // Example data for local districts
  const localData = [
    { name: "Diana Haynes", party: "Liberal", votes: 1567 },
    { name: "Eric Foster", party: "Conservative", votes: 2678 },
    { name: "Fiona Cheng", party: "Green", votes: 3789 }
  ];

  // State to store selections
  const [selectedRegional, setSelectedRegional] = useState(null);
  const [selectedLocal, setSelectedLocal] = useState(null);

  // Helper function to render table rows with select buttons
  const renderRows = (data, setType) => data.map((item, index) => (
    <tr key={index}>
      <td>{item.name}</td>
      <td>{item.party}</td>
      <td>{item.votes}</td>
      <td>
        <button className='votingpagebutton' onClick={() => {
          if (setType === 'regional') {
            setSelectedRegional(item.name);
          } else {
            setSelectedLocal(item.name);
          }
        }}>
          Select
        </button>
      </td>
    </tr>
  ));

  return (
    <div className="table-container">
      <table className="district-table">
        <thead>
          <tr>
            <th>Candidates Name</th>
            <th>Political Party</th>
            <th>Vote Count</th>
            <th>Vote for</th>
          </tr>
        </thead>
        <tbody>
          {renderRows(regionalData, 'regional')}
        </tbody>
      </table>
      <p>{selectedRegional ? `Selected Regional Candidate: ${selectedRegional}` : ''}</p>

      <table className="district-table">
        <thead>
          <tr>
            <th>Candidates Name</th>
            <th>Political Party</th>
            <th>Vote Count</th>
            <th>Vote for</th>
          </tr>
        </thead>
        <tbody>
          {renderRows(localData, 'local')}
        </tbody>
      </table>
      <p>{selectedLocal ? `Selected Local Candidate: ${selectedLocal}` : ''}</p>
    </div>
  );
}

export default DistrictTables;

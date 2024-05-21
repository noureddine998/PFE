import React, { useEffect, useState } from 'react';
import './PageWinner.css';
import '../../components/VerticalNav/VerticalNav.css';
import AddCandidates from '../../components/adminAddCandidate/AdminAddCandidate';
import VerticalNav from '../../components/VerticalNav/VerticalNav';
import { axiosClient } from '../../api/axios';
import { constituencies } from '../../data/Districts';

const PageWinner = () => {
  const [candidates, setCandidates] = useState([]);
  const [showAddCandidate, setShowAddCandidate] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState('');

  useEffect(() => {
    axiosClient.get('/api/getCandidates', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    })
      .then(response => {
        setCandidates(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the Candidates!", error);
      });
  }, []);

  const handleAddCandidateClick = () => {
    setShowAddCandidate(true);
  };

  const handleCloseModal = () => {
    setShowAddCandidate(false);
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
  };

  const filteredCandidates = selectedDistrict
    ? candidates.filter(candidate => candidate.district_name === selectedDistrict)
    : candidates;

  return (
    <div className="admin-page-container">
      
      
       <div>
        <label htmlFor="district">Filter by District:</label>
        <input list="districtname" name="district" id="district" value={selectedDistrict} onChange={handleDistrictChange} />
        <datalist id="districtname">
          {constituencies.map((district, index) => (
            <option key={index} value={district} />
          ))}
        </datalist>
      </div> 
      <div>
        
        <table className="content-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Party</th>
              <th>District Type</th>
              <th>District Name</th>
              <th>Vote Count</th>
              <th>Seats Won</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.map(candidate => (
              <tr key={candidate.id}>
                <td>{candidate.full_name}</td>
                <td>{candidate.age}</td>
                <td>{candidate.gender}</td>
                <td>{candidate.party}</td>
                <td>{candidate.district_type}</td>
                <td>{candidate.district_name}</td>
                <td>{candidate.voteCount}</td>
                <td>{candidate.seatsWon}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {showAddCandidate && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={handleCloseModal}>&times;</span>
              
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageWinner;

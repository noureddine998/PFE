import React, { useEffect, useState } from 'react';
import './tablesStyle.css';
import '../../components/VerticalNav/VerticalNav.css';
import AddCandidates from '../../components/adminAddCandidate/AdminAddCandidate'; // Fix import path
import VerticalNav from '../../components/VerticalNav/VerticalNav'; // Fix import path
import { axiosClient } from '../../api/axios';
import { constituencies } from '../../data/Districts'; // Fix import path

const CandidatesList = () => {
  const [candidates, setCandidates] = useState([]); // This state holds the list of candidates
  const [showAddCandidate, setShowAddCandidate] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState(''); // State to hold selected district

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
    <div className="main-container">
      {/* <div>
        <label htmlFor="district">Filter by District:</label>
        <input list="districtname" name="district" id="district" value={selectedDistrict} onChange={handleDistrictChange} />
        <datalist id="districtname">
          {constituencies.map((district, index) => (
            <option key={index} value={district} />
          ))}
        </datalist>
      </div> */}
      <div>
        <button className='AddButtons' onClick={handleAddCandidateClick}>Ajouter une candidate</button>
        <table className="content-table">
          <thead>
            <tr>
              <th>Nom et prénom</th>
              <th>Age</th>
              <th>Genre</th>
              <th>Parti politique</th>
              <th>Type de circonscription électorale</th>
              <th>Nom de la circonscription électorale</th>
              <th>Nombre de vote</th>
              <th>Sièges gagnés</th>
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
              <AddCandidates />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidatesList;

import React, { useEffect,useState } from 'react';
import './tablesStyle.css';
import '../../components/VerticalNav/VerticalNav.css';
import AddCandidates from '../../components/adminAddCandidate/AdminAddCandidate'; // Fix import path
import VerticalNav from '../../components/VerticalNav/VerticalNav'; // Fix import path
import { axiosClient } from '../../api/axios';



const CandidatesList = () => {

  const [candidates, setCandidates] = useState([]); // This state holds the list of candidates
  const [showAddCandidate, setShowAddCandidate] = useState(false);

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

return (
    <div className="admin-page-container">
      <VerticalNav />
       {/* <AddCandidates/>  */}
      <div >
      <button className='AddButtons' onClick={handleAddCandidateClick}>Add Candidate</button>        <table className="content-table">
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
            {candidates.map(candidate => (
              <tr key={candidate.id}>
                <td>{candidate.full_name}</td>
                <td>{candidate.age}</td>
                <td>{candidate.gender}</td>
                <td>{candidate.party}</td>
                <td>{candidate.district_type}</td>
                <td>{candidate.district_name}</td>
                <td>{candidate.voteCount}</td>
                <td>{candidate.SeatsWon}</td>
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

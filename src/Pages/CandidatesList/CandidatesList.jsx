import React from 'react';
import './CandidatesList.css';
import '../../components/VerticalNav/VerticalNav.css';
import AddCandidates from '../../components/adminAddCandidate/AdminAddCandidate'; // Fix import path
import VerticalNav from '../../components/VerticalNav/VerticalNav'; // Fix import path

const CandidatesList = () => {
  return (
    <div className="admin-page-container">
      <VerticalNav />
      <div className="main-content">
        <div className='center'>
          <header className="page-header">Add Candidates</header>
          <div className="district-panels">
            <div className="local-districts-panel district-panel">
              <h2>Local Districts</h2>
              {/* Local districts will be listed here */}
            </div>
            <div className="regional-districts-panel district-panel">
              <h2>Regional Districts</h2>
              {/* Regional districts will be listed here */}
            </div>
          </div>
        </div>
        <div className="create-district-container">
          <AddCandidates /> {/* Use correct component name */}
        </div>
      </div>
    </div>
  );
};

export default CandidatesList;

import React, { useState } from 'react';
import './VoterList.css';
import '../../components/VerticalNav/VerticalNav.css';
import  AddVoter  from '../../components/AddVoters/AddVoter'; // Corrected import
import VerticalNav from '../../components/VerticalNav/VerticalNav';

const VoterList = () => {
  const [voters, setVoters] = useState([]);

  const handleNewVoter = (voterData) => {
    setVoters([...voters, voterData]);
  };

  return (
    <div className="admin-page-container">
      <VerticalNav />
      <div className="main-content">
        <div className="voters-content"> {/* Adjusted for clearer division */}
          <header className="page-header">Voters</header>
          <table>
            <thead>
              <tr>
                <th>CIN</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {voters.map((voter, index) => (
                <tr key={index}>
                  <td>{voter.cin}</td>
                  <td>{voter.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <AddVoter onSubmit={handleNewVoter}/> 
      </div>
    </div>
  );
};

export default VoterList;

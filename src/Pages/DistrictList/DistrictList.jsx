import React, { useState } from 'react';
import './DistrictList.css'; // Import the CSS file for styling
import CreateDistrict from '../../components/CreateDistrict/CreateDistrict';
import VerticalNav from '../../components/VerticalNav/VerticalNav';

const DistrictList = () => {
  const [districts, setDistricts] = useState([]); // State to store districts data

  // Function to handle submission of new district
  const handleNewDistrict = (newDistrict) => {
    setDistricts([...districts, newDistrict]); // Add the new district to the districts list
  };

  return (
    <div className="admin-page-container">
      <VerticalNav />
      <CreateDistrict onSubmit={handleNewDistrict} />
      <div className="districts-table">
        <table>
          <thead>
            <tr>
              <th>District Type</th>
              <th>District Name</th>
              <th>Seats To Win</th>
            </tr>
          </thead>
          <tbody>
            {districts.map((district, index) => (
              <tr key={index}>
                <td>{district.districtType}</td>
                <td>{district.districtName}</td>
                <td>{district.seatsToWin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DistrictList;

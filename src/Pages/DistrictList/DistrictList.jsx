import React, { useState } from 'react';
import './DistrictList.css';
import CreateDistrict from '../../components/CreateDistrict/CreateDistrict';
import VerticalNav from '../../components/VerticalNav/VerticalNav';

const DistrictList = () => {
  const [districts, setDistricts] = useState([]);

  const handleNewDistrict = (newDistrict) => {
    setDistricts([...districts, newDistrict]);
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
                <td>{district.district_type}</td>
                <td>{district.district_name}</td>
                <td>{district.seats_to_win}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DistrictList;

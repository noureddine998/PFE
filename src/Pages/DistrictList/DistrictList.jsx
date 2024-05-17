import React, { useEffect,useState } from 'react';
import CreateDistrict from '../../components/CreateDistrict/CreateDistrict';
import VerticalNav from '../../components/VerticalNav/VerticalNav';
import '../CandidatesList/tablesStyle.css';
import axios from 'axios';
import { axiosClient } from '../../api/axios';
const DistrictList = () => {
  const [districts, setDistricts] = useState([]);
  const [showCreateDistrict, setShowCreateDistrict] = useState(false); // State for modal visibility

  useEffect(() => {
    
      axiosClient.get('/api/getdistricts', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    })
          .then(response => {
              setDistricts(response.data);
          })
          .catch(error => {
              console.error("There was an error fetching the districts!", error);
          });
  }, []);

  const handleAddDistrictClick = () => {
    setShowCreateDistrict(true);
  };

  const handleCloseModal = () => {
    setShowCreateDistrict(false);
  };
  return (
    <div className="admin-page-container">
      <VerticalNav />
      {/* <CreateDistrict onSubmit={handleNewDistrict} /> */}
      <div >
      <button className='AddButtons' onClick={handleAddDistrictClick}>Add District</button>        <table className= "content-table">
        <thead>
            <tr>
              <th>District Type</th>
              <th>District Name</th>
              <th>Seats To Win</th>
              <th>Number of Voters</th>
            </tr>
          </thead>
          <tbody>
          {districts.map(district => (
                        <tr key={district.id}>
                            <td>{district.district_type}</td>
                            <td>{district.district_name}</td>
                            <td>{district.seats_to_win}</td>
                            <td>{district.number_of_voters}</td>
                        </tr>
                    ))}
          </tbody>
        </table>
        {showCreateDistrict && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <CreateDistrict onSubmit={handleCloseModal} />
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default DistrictList;

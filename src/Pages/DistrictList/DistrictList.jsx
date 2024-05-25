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
    <div className="main-container">
      {/* <CreateDistrict onSubmit={handleNewDistrict} /> */}
      <div >
      <button className='AddButtons' onClick={handleAddDistrictClick}>Ajouter une circonscription électorale</button>        <table className= "content-table">
        <thead>
            <tr>
            <th>Type de circonscription électorale</th>
            <th>Nom de la circonscription électorale</th>
            <th>Sièges gagnés</th>
              <th>Nombre d'électeurs</th>
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

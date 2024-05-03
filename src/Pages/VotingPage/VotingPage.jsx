import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VotingPage.css'
import { axiosClient } from '../../api/axios';

function VotingPage() {
    const [localCandidates, setLocalCandidates] = useState([]);
    const [regionalCandidates, setRegionalCandidates] = useState([]);
    const [userPreferences, setUserPreferences] = useState({ localDistrict: '', region: '' });

    useEffect(() => {
        // Fetch user details including preferences
        
        axiosClient.get('/api/user/details', {
          headers: {
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
      }) 
            .then(response => {
              console.log('User details fetched successfully', response.data);
                setUserPreferences({
                    localDistrict: response.data.localDistrict,
                    region: response.data.region
                });
                // Fetch local district candidates
                fetchCandidates('local', response.data.localDistrict);
                // Fetch regional candidates
                fetchCandidates('regional', response.data.region);
            })
            .catch(error => {
                console.error('Error fetching user details', error);
            });
    }, []);

    const fetchCandidates = (district_type, district_name) => {
        axiosClient.get(`/api/candidates/${district_type}/${district_name}`,{
          headers: {
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
      })
            .then(response => {
                if (district_type === 'local') {
                    setLocalCandidates(response.data);
                } else {
                    setRegionalCandidates(response.data);
                }
            })
            .catch(error => {
                console.error(`Error fetching ${district_type} district candidates`, error);
            });
    };

    return (
        <div className="table-container">
            <h1>Local District Candidates</h1>
            <table className="district-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>District</th>
                    </tr>
                </thead>
                <tbody>
                    {localCandidates.map(candidate => (
                        <tr key={candidate.id}>
                            <td>{candidate.full_name}</td>
                            <td>{candidate.district_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h1>Regional Candidates</h1>
            <table className="district-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Region</th>
                    </tr>
                </thead>
                <tbody>
                    {regionalCandidates.map(candidate => (
                        <tr key={candidate.id}>
                            <td>{candidate.full_name}</td>
                            <td>{candidate.district_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default VotingPage;

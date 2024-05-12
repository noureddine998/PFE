import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './VotingPage.css';
import { axiosClient } from '../../api/axios';
import { ethers } from 'ethers';
import { contractAbi, contractAddress } from '../../api/constant';

function VotingPage() {
    const [localCandidates, setLocalCandidates] = useState([]);
    const [regionalCandidates, setRegionalCandidates] = useState([]);
    const [userPreferences, setUserPreferences] = useState({ localDistrict: '', region: '' });
    const [contract, setContract] = useState(null);

    useEffect(() => {
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
                fetchCandidates('local', response.data.localDistrict);
                fetchCandidates('regional', response.data.region);
            })
            .catch(error => {
                console.error('Error fetching user details', error);
            });

        initContract();
    }, []);

    const initContract = async () => {
        if (window.ethereum) {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
            setContract(contractInstance);
        } else {
            console.error("Ethereum object not found, install MetaMask.");
        }
    };

    const fetchCandidates = (district_type, district_name) => {
        axiosClient.get(`/api/candidates/${district_type}/${district_name}`, {
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

    const voteLocal = async (candidateId) => {
        try {
            // Call the voteLocal function of the contract
            await contract.voteLocal(candidateId, 0, userPreferences.localDistrict);

            // API call to increment the vote count in the database
            await axiosClient.post(`/api/candidates/${candidateId}/vote`, null, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });

            // Refresh the list of local candidates after voting
            fetchCandidates('local', userPreferences.localDistrict);
            alert(`Voted for candidate with ID ${candidateId} in local district ${userPreferences.localDistrict}`);
        } catch (error) {
            console.error('Error voting locally:', error);
            alert('Failed to vote locally.');
        }
    };

    const voteRegional = async (candidateId) => {
        try {
            // Call the voteRegional function of the contract
            await contract.voteRegional(candidateId, 1, userPreferences.region);

            // API call to increment the vote count in the database
            await axiosClient.post(`/api/candidates/${candidateId}/vote`, null, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });

            // Refresh the list of regional candidates after voting
            fetchCandidates('regional', userPreferences.region);
            alert(`Voted for candidate with ID ${candidateId} in regional district ${userPreferences.region}`);
        } catch (error) {
            console.error('Error voting regionally:', error);
            alert('Failed to vote regionally.');
        }
    };

    return (
        <div className="table-container">
            <h1>Local District Candidates</h1>
            <table className="district-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>District</th>
                        <th>Action</th>
                        <th>Vote count</th>
                    </tr>
                </thead>
                <tbody>
                    {localCandidates.map(candidate => (
                        <tr key={candidate.id}>
                            <td>{candidate.full_name}</td>
                            <td>{candidate.district_name}</td>
                            <td><button onClick={() => voteLocal(candidate.id)} className='voteLocal'>Vote</button></td>
                            <td>{candidate.voteCount}</td>
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
                        <th>Action</th>
                        <th>Vote count</th>
                    </tr>
                </thead>
                <tbody>
                    {regionalCandidates.map(candidate => (
                        <tr key={candidate.id}>
                            <td>{candidate.full_name}</td>
                            <td>{candidate.district_name}</td>
                            <td><button onClick={() => voteRegional(candidate.id)} className='voteRegional'>Vote</button></td>
                            <td>{candidate.voteCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default VotingPage;

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
    const [contract, setContract] = useState(null); // State to store the contract instance

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

        // Initialize the contract
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

    const voteLocal = async (candidateFullName) => {
        try {
            // Call the voteLocal function of the contract
            await contract.voteLocal(candidateFullName, 0, userPreferences.localDistrict);
            // Refresh the list of local candidates after voting
            fetchCandidates('local', userPreferences.localDistrict);
            alert(`Voted for ${candidateFullName} in local district ${userPreferences.localDistrict}`);
        } catch (error) {
            console.error('Error voting locally:', error);
            alert('Failed to vote locally.');
        }
    };

    const voteRegional = async (candidateFullName) => {
        try {
            // Call the voteRegional function of the contract
            await contract.voteRegional(candidateFullName, 1, userPreferences.region);
            // Refresh the list of regional candidates after voting
            fetchCandidates('regional', userPreferences.region);
            alert(`Voted for ${candidateFullName} in regional district ${userPreferences.region}`);
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
                    </tr>
                </thead>
                <tbody>
                    {localCandidates.map(candidate => (
                        <tr key={candidate.id}>
                            <td>{candidate.full_name}</td>
                            <td>{candidate.district_name}</td>
                            <td><button onClick={() => voteLocal(candidate.full_name)} className='voteLocal'>Vote</button></td>
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
                    </tr>
                </thead>
                <tbody>
                    {regionalCandidates.map(candidate => (
                        <tr key={candidate.id}>
                            <td>{candidate.full_name}</td>
                            <td>{candidate.district_name}</td>
                            <td><button onClick={() => voteRegional(candidate.full_name)} className='voteRegional'>Vote</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default VotingPage;

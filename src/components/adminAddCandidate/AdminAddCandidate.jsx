import React, { useState } from 'react';
import styles from './AdminAddCandidate.module.css';
import { ethers } from 'ethers';
import { regions, constituencies, parties } from '../../data/Districts';
import { contractAbi, contractAddress } from '../../api/constant';
import { axiosClient } from '../../api/axios';

// Enum definitions to match the smart contract
const Gender = {
    male: 'male',
    female: 'female',
};

const DistrictType = {
    local: 0,
    regional: 1,
};



function AddCandidateForm() {
    // State for each form field
    const [fullName, setFullName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState(Gender.male);
    const [party, setParty] = useState('');
    const [districtType, setDistrictType] = useState('');
    const [districtName, setDistrictName] = useState('');

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convert the inputs to the correct types
        const candidateGender = gender === 'Male' ? '0' : '1';
        const candidateDsType = districtType === 0 ? 'Regional' : 'Local';
        const candidateAge = parseInt(age, 10);
        const candidateDistrictType = parseInt(districtType, 10);
        const candidateGenderType = parseInt(candidateGender, 10);



        // Construct the candidate data
        const candidateData = {
            full_name: fullName,
            age: candidateAge,
            gender : gender,
            party,
            district_type: candidateDsType,
            district_name: districtName,
        };

        // Validation based on the smart contract requirements

        // Backend API call
        try {
            const response = await axiosClient.post('/api/candidates', candidateData);
            console.log('Candidate added:', response.data);
            alert("Candidate added successfully ");

        } catch (error) {
            console.error('Error adding candidate:', error);
            return;
        }

      //  Smart Contract Interaction
        try {
            if (!window.ethereum) {
                alert("MetaMask is not installed. Please install it to use this app.");
                return;
            }

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractAbi, signer);

            // Call the addCandidate function
            const tx = await contract.addCandidate(fullName, candidateAge, candidateGenderType, party, candidateDistrictType, districtName);
            await tx.wait(); // Wait for the transaction to be mined
            alert("Candidate added successfully to the Blockchain!");

            // Reset the form
            setFullName('');
            setAge('');
            setGender('');
            setParty('');
            setDistrictType('');
            setDistrictName('');
        } catch (error) {
            console.error("Error adding candidate:", error);
            alert(`Failed to add candidate: ${error.message}`);
        }
     };

    const districtOptions = districtType === '0' ? constituencies : regions;

    return (
    <div>
    <h2>Add Candidate</h2>
        <form onSubmit={handleSubmit} className={styles.formcontainer}>
            <label>
                Full Name:
            <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} required />
            </label>
            <label>
                Age:
            <input type="number" value={age} onChange={e => setAge(e.target.value)} required />
            </label>
            <label>
                Gender:
            <select value={gender} onChange={e => setGender(e.target.value)} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
            </label>
            <label>
                Party:
                <select value={party} onChange={e => setParty(e.target.value)} required>
                    <option value="">Select Party</option>
                    {parties.map(party => <option key={party} value={party}>{party}</option>)}
                </select>
            </label>
            <label>
                District Type:
                <select value={districtType} onChange={e => setDistrictType(e.target.value)} required>
                    <option value="">Select District Type</option>
                    <option value="0">Local</option>
                    <option value="1">Regional</option>
                </select>
            </label>
            <label>
                District Name:
                <select value={districtName} onChange={e => setDistrictName(e.target.value)} required>
                    <option value="">Select District Name</option>
                    {districtOptions.map(name => <option key={name} value={name}>{name}</option>)}
                </select>
            </label>
            <button type="submit">Add Candidate</button>
        </form></div>
    );
}

export default AddCandidateForm;

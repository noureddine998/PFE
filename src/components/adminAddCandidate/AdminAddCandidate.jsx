import React, { useState } from 'react';
import styles from './AdminAddCandidate.module.css';
import { ethers } from 'ethers';
import { regions, constituencies, parties } from '../../data/Districts';
import { contractAbi, contractAddress } from '../../api/constant';
import { axiosClient } from '../../api/axios';

// Enum definitions to match the smart contract
const Gender = {
    male: '0',
    female: '1',
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
        const candidateAge = parseInt(age, 10);
        const candidateDistrictType = districtType === '1' ? 'Regionale' : 'Locale';
        const candidateGenderType = parseInt(candidateGender, 10);

        // Construct the candidate data
        const candidateData = {
            full_name: fullName,
            age: candidateAge,
            gender: gender === 'Male' ? 'Homme' : 'Femme',
            party,
            district_type: candidateDistrictType,
            district_name: districtName,
        };

        // Validation based on the smart contract requirements

        // Backend API call
      

        // Smart Contract Interaction
        try {
            if (!window.ethereum) {
                alert("MetaMask is not installed. Please install it to use this app.");
                return;
            }

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractAbi, signer);

            // Call the addCandidate function
            const tx = await contract.addCandidate(fullName, candidateAge, candidateGenderType, party, parseInt(districtType, 10), districtName);
            await tx.wait(); // Wait for the transaction to be mined
            alert("Candidate added successfully to the Blockchain!");

            // Reset the form
            setFullName('');
            setAge('');
            setGender(Gender.male);
            setParty('');
            setDistrictType('');
            setDistrictName('');
        } catch (error) {
            console.error("Error adding candidate:", error);
            alert(`Failed to add candidate: ${error.message}`);
        }

        try {
            const response = await axiosClient.post('/api/candidates', candidateData);
            console.log('Candidate added:', response.data);
            alert("Candidate added successfully !");
        } catch (error) {
            console.error('Error adding candidate:', error);
            return;
        }

    };

    const districtOptions = districtType === '1' ? regions : constituencies;

    return (
        <div>
            <h2>Ajouter un Candidat</h2>
            <form onSubmit={handleSubmit} className={styles.formcontainer}>
                <label>
                    Nom complet:
                    <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} required />
                </label>
                <label>
                    Age:
                    <input type="number" value={age} onChange={e => setAge(e.target.value)} required />
                </label>
                <label>
                    Sexe:
                    <select value={gender} onChange={e => setGender(e.target.value)} required>
                        <option value="">Choisir le sexe</option>
                        <option value="Male">Homme</option>
                        <option value="Female">Femme</option>
                    </select>
                </label>
                <label>
                    Parti politique:
                    <select value={party} onChange={e => setParty(e.target.value)} required>
                        <option value="">Choisir la parti politique</option>
                        {parties.map(party => <option key={party} value={party}>{party}</option>)}
                    </select>
                </label>
                <label>
                    Type du circonscription electoral:
                    <select value={districtType} onChange={e => setDistrictType(e.target.value)} required>
                        <option value="">Choisir le type</option>
                        <option value="0">Locale</option>
                        <option value="1">Regionale</option>
                    </select>
                </label>
                <label>
                    Circonscription electoral:
                    <select value={districtName} onChange={e => setDistrictName(e.target.value)} required>
                        <option value="">Choisir la circonscription</option>
                        {districtOptions.map(name => <option key={name} value={name}>{name}</option>)}
                    </select>
                </label>
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
}

export default AddCandidateForm;

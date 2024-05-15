import React, { useState } from 'react';
import { ethers } from 'ethers';
import { contractAddress, contractAbi } from '../../api/constant';
import { constituencies, regions } from '../../data/Districts';
import { axiosClient } from '../../api/axios';
import styles from './CreateDistrict.module.css';

function CreateDistrict({ onSubmit }) {
    const [districtName, setDistrictName] = useState('');
    const [districtType, setDistrictType] = useState('local');
    const [seatsToWin, setSeatsToWin] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleCreateDistrict = async () => {
        try {
            if (!window.ethereum) {
                alert("MetaMask is not installed. Please install it to use this app.");
                return;
            }

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractAbi, signer);

            const tx = await contract.createDistrict(districtType === 'local' ? 0 : 1, districtName, parseInt(seatsToWin));
            await tx.wait(); // Wait for the transaction to be mined
            return tx; // Return transaction details
        } catch (error) {
            console.error("Error creating district:", error);
            throw new Error(`Failed to create district: ${error.message}`);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            await handleCreateDistrict();

            const data = {
                district_type: districtType,
                district_name: districtName,
                seats_to_win: seatsToWin
            };

            await axiosClient.get('/sanctum/csrf-cookie'); // Ensure the CSRF cookie is set
            const response = await axiosClient.post('/api/districts', data);
            onSubmit(response.data); // Update parent component with new district data
            alert("District created successfully!");
        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Determine options based on district type
    const districtOptions = districtType === 'local' ? constituencies : regions;

    return (
        <div>
            <h2>Create District</h2>
            <form onSubmit={handleSubmit} className={styles.formcontainer}>
                <div>
                    <label>District Type:</label>
                    <select
                        value={districtType}
                        onChange={(e) => setDistrictType(e.target.value)}
                        required
                    >
                        <option value="local">Local</option>
                        <option value="regional">Regional</option>
                    </select>
                </div>

                <div>
                    <label>District Name:</label>
                    <select
                        value={districtName}
                        onChange={(e) => setDistrictName(e.target.value)}
                        required
                    >
                        <option value="">Select District</option>
                        {districtOptions.map((name, index) => (
                            <option key={index} value={name}>{name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Seats to Win:</label>
                    <input
                        type="number"
                        value={seatsToWin}
                        onChange={(e) => setSeatsToWin(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Creating..." : "Create District"}
                </button>
                <div className="note">
        Note: District creation will take several minutes.
      </div>
            </form>
            
        </div>
    );
}

export default CreateDistrict;

import React, { useState } from 'react';
import { ethers } from 'ethers';
import { contractAddress,contractAbi } from '../../api/constant';
import { constituencies,regions } from '../../data/Districts';
function CreateDistrict() {
    const [districtName, setDistrictName] = useState('');
    const [districtType, setDistrictType] = useState(0);
    const [seatsToWin, setSeatsToWin] = useState('');

    const handleCreateDistrict = async () => {
        try {
            if (!window.ethereum) {
                alert("MetaMask is not installed. Please install it to use this app.");
                return;
            }

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractAbi, signer);

            const tx = await contract.createDistrict(districtType, districtName, parseInt(seatsToWin));
            await tx.wait(); // Wait for the transaction to be mined
            alert("District created successfully!");
        } catch (error) {
            console.error("Error creating district:", error);
            alert(`Failed to create district: ${error.message}`);
        }
    };

    // Determine options based on district type
    const districtOptions = districtType === 0 ? constituencies : regions;

    return (
        <div>
            <h2>Create District</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleCreateDistrict();
            }}>

<div>
                    <label>District Type:</label>
                    <select
                        value={districtType}
                        onChange={(e) => setDistrictType(parseInt(e.target.value))}
                        required
                    >
                        <option value={0}>Local</option>
                        <option value={1}>Regional</option>
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
                <button type="submit">Create District</button>
            </form>
        </div>
    );
}

export default CreateDistrict;

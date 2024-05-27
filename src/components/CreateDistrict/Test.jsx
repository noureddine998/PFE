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



    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
    }


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

                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Searching..." : "Create District"}
                </button>
                <div className="note">
      </div>
            </form>
            
        </div>
    );
}

export default CreateDistrict;

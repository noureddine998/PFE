import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { contractAbi, contractAddress } from '../../api/constant'; // Adjust the path as needed
import './AdminPage.css';
import VerticalNav from '../../components/VerticalNav/VerticalNav';
function AdminPage() {
    const [contract, setContract] = useState(null);

    useEffect(() => {
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

    const startElection = async () => {
        try {
            if (contract) {
                await contract.startElection();
                alert("Election started successfully!");
            } else {
                alert("Contract is not initialized properly.");
            }
        } catch (error) {
            console.error("Error starting election:", error);
            alert("Failed to start the election.");
        }
    };

    return (
      
        <div className="admin-page-container">
          <VerticalNav/>
            <h1>Admin Page</h1>
            <button onClick={startElection}>Start Election</button>
            {/* Add other admin functionalities here */}
        </div>
    );
}

export default AdminPage;
